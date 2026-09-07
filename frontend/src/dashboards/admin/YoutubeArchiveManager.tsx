import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import api from '../../services/api';
import { Search, Plus, Edit3, Trash2, Video, Star, Archive, Eye, ExternalLink, Save } from 'lucide-react';

type ArchiveItem = {
  id?: number;
  title: string;
  speaker: string;
  description: string;
  youtube_url: string;
  channel_name: string;
  channel_url: string;
  category: 'live' | 'featured' | 'serious' | 'theme';
  badge: string;
  duration: string;
  thumbnail_url: string;
  is_featured: boolean;
  is_archived: boolean;
  sort_order: number;
};

const defaultDraft: ArchiveItem = {
  title: '',
  speaker: '',
  description: '',
  youtube_url: '',
  channel_name: '',
  channel_url: '',
  category: 'featured',
  badge: 'Featured',
  duration: 'Playlist',
  thumbnail_url: '',
  is_featured: false,
  is_archived: false,
  sort_order: 0,
};

const YoutubeArchiveManager = () => {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState<ArchiveItem>(defaultDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const formPanelRef = useRef<HTMLDivElement | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/content/youtube-archive');
      setItems(response.data?.data || []);
    } catch (error: any) {
      console.error('Failed to load archive items:', error);
      toast.error(error.response?.data?.message || 'Unable to load archive items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    return items.filter((item) =>
      [item.title, item.speaker, item.channel_name, item.category, item.badge]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [items, search]);

  const resetDraft = () => {
    setDraft(defaultDraft);
    setEditingId(null);
  };

  const handleNewArchiveItem = () => {
    resetDraft();

    requestAnimationFrame(() => {
      formPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstInput = formPanelRef.current?.querySelector('input, textarea, select');
      if (firstInput instanceof HTMLElement) {
        firstInput.focus();
      }
    });
  };

  const handleSubmit = async () => {
    if (!draft.title.trim() || !draft.speaker.trim() || !draft.youtube_url.trim()) {
      toast.error('Title, speaker and YouTube link are required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...draft,
        title: draft.title.trim(),
        speaker: draft.speaker.trim(),
        description: draft.description.trim(),
        youtube_url: draft.youtube_url.trim(),
        channel_name: draft.channel_name.trim(),
        channel_url: draft.channel_url.trim(),
        badge: draft.badge.trim() || 'Featured',
        duration: draft.duration.trim() || 'Playlist',
      };

      if (editingId) {
        await api.put(`/content/youtube-archive/${editingId}`, payload);
        toast.success('Archive item updated');
      } else {
        await api.post('/content/youtube-archive', payload);
        toast.success('Archive item created');
      }

      resetDraft();
      await loadItems();
    } catch (error: any) {
      console.error('Failed to save archive item:', error);
      toast.error(error.response?.data?.message || 'Could not save archive item');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: ArchiveItem) => {
    setEditingId(item.id || null);
    setDraft({ ...item });
  };

  const handleLiveAction = async (item: ArchiveItem, action: 'stop' | 'archive') => {
    if (!item.id) return;

    const actionLabel = action === 'stop' ? 'stop the live stream' : 'archive the live stream';
    if (!window.confirm(`Are you sure you want to ${actionLabel}?`)) return;

    try {
      const payload = {
        ...item,
        category: action === 'stop' ? 'featured' : item.category,
        badge: action === 'stop' ? 'Featured' : 'Archived',
        is_archived: action === 'archive',
      };

      await api.put(`/content/youtube-archive/${item.id}`, payload);
      toast.success(action === 'stop' ? 'Live stream stopped and saved to the archive' : 'Live stream archived');
      await loadItems();
    } catch (error: any) {
      console.error(`Failed to ${action} live stream:`, error);
      toast.error(error.response?.data?.message || `Could not ${actionLabel}`);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    if (!window.confirm('Delete this archive item?')) return;

    try {
      await api.delete(`/content/youtube-archive/${id}`);
      toast.success('Archive item deleted');
      await loadItems();
      if (editingId === id) resetDraft();
    } catch (error: any) {
      console.error('Failed to delete archive item:', error);
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-[#865014] uppercase tracking-[0.18em]">Admin tools</p>
          <h1 className="text-3xl font-bold text-slate-800">YouTube archive manager</h1>
        </div>
        <Button onClick={handleNewArchiveItem} className="bg-[#865014] hover:bg-[#71420f] text-white">
          <Plus className="h-4 w-4 mr-2" /> New archive item
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search archive entries"
              className="max-w-sm"
            />
          </div>

          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading archive items...</p>
            ) : filteredItems.length === 0 ? (
              <p className="text-sm text-slate-500">No archive items found.</p>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{item.title}</h3>
                        {item.is_featured && <Star className="h-4 w-4 text-amber-500" />}
                        {item.is_archived && <Archive className="h-4 w-4 text-slate-500" />}
                      </div>
                      <p className="text-sm text-slate-600">{item.speaker}</p>
                      <p className="text-xs text-slate-500">{item.channel_name || 'YouTube'} • {item.category}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.badge}</Badge>
                      {item.category === 'live' && !item.is_archived && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleLiveAction(item, 'stop')}>
                            Stop Live
                          </Button>
                          <Button variant="outline" size="sm" className="text-amber-700 hover:text-amber-800" onClick={() => handleLiveAction(item, 'archive')}>
                            <Archive className="h-4 w-4 mr-1" /> Archive Live
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit3 className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Video className="h-3.5 w-3.5" /> {item.duration}</span>
                    <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {item.is_archived ? 'Archived' : 'Active'}</span>
                    {item.youtube_url && (
                      <a href={item.youtube_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#865014] hover:underline">
                        Open YouTube <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div ref={formPanelRef} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">{editingId ? 'Edit archive item' : 'Create archive item'}</h2>
            {editingId && (
              <Button variant="outline" size="sm" onClick={resetDraft}>Cancel</Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Sabbath message series" />
            </div>

            <div>
              <Label>Speaker / ministry</Label>
              <Input value={draft.speaker} onChange={(e) => setDraft({ ...draft, speaker: e.target.value })} placeholder="Hope Channel Ethiopia" />
            </div>

            <div>
              <Label>Short description</Label>
              <Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Describe what this sermon or playlist is about" rows={3} />
            </div>

            <div>
              <Label>YouTube URL</Label>
              <Input value={draft.youtube_url} onChange={(e) => setDraft({ ...draft, youtube_url: e.target.value })} placeholder="https://www.youtube.com/..." />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Channel name</Label>
                <Input value={draft.channel_name} onChange={(e) => setDraft({ ...draft, channel_name: e.target.value })} placeholder="Hope Channel Ethiopia" />
              </div>
              <div>
                <Label>Channel URL</Label>
                <Input value={draft.channel_url} onChange={(e) => setDraft({ ...draft, channel_url: e.target.value })} placeholder="https://www.youtube.com/@..." />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Category</Label>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value as ArchiveItem['category'] })}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#865014]/20"
                >
                  <option value="live">Live</option>
                  <option value="featured">Featured</option>
                  <option value="serious">Serious</option>
                  <option value="theme">Theme</option>
                </select>
              </div>

              <div>
                <Label>Badge</Label>
                <Input value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} placeholder="Featured" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Duration</Label>
                <Input value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} placeholder="Playlist" />
              </div>
              <div>
                <Label>Sort order</Label>
                <Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) || 0 })} />
              </div>
            </div>

            <div>
              <Label>Thumbnail URL</Label>
              <Input value={draft.thumbnail_url} onChange={(e) => setDraft({ ...draft, thumbnail_url: e.target.value })} placeholder="https://.../image.jpg" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
                <input type="checkbox" checked={draft.is_featured} onChange={(e) => setDraft({ ...draft, is_featured: e.target.checked })} />
                Feature on archive
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
                <input type="checkbox" checked={draft.is_archived} onChange={(e) => setDraft({ ...draft, is_archived: e.target.checked })} />
                Archive this item
              </label>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full bg-[#865014] hover:bg-[#71420f] text-white"
            >
              {saving ? 'Saving...' : editingId ? <><Save className="h-4 w-4 mr-2" /> Update item</> : <><Plus className="h-4 w-4 mr-2" /> Create item</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeArchiveManager;
