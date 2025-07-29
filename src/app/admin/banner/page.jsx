'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Typography,
} from '@mui/material';

export default function AdminBannerPage() {
  const [title, setTitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [banners, setBanners] = useState([]);

  // Load banners from API
  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banner');
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error('Failed to fetch banners:', err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Upload new banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('isActive', isActive);
      formData.append('sortOrder', sortOrder);
      formData.append('image', file);

      const res = await fetch('/api/admin/banner', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('✅ Banner uploaded successfully.');
        setTitle('');
        setIsActive(true);
        setSortOrder(0);
        setFile(null);
        await fetchBanners(); //Refetch after upload
      } else {
        const err = await res.json();
        setMessage(`❌ Failed: ${err.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error occurred while uploading banner.');
    }
  };

  // Update banner info
  const handleBannerUpdate = async (banner) => {
    await fetch(`/api/admin/banner/${banner.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(banner),
    });
    await fetchBanners(); //Refetch after update
  };

  // Delete a banner
  const handleDelete = async (id) => {
    await fetch(`/api/admin/banner/${id}`, {
      method: 'DELETE',
    });
    await fetchBanners();
  };

  const activeBanners = banners.filter((b) => b.isActive);

  return (
    <Stack direction="row" spacing={4} sx={{ px: 4, py: 5 }}>
      {/* Column 1: Active Banners */}
      <Stack spacing={3} sx={{ width: '30%' }}>
        <Typography variant="h6">Active Banners</Typography>
        {activeBanners.map((b) => (
          <Stack key={b.id} spacing={1} alignItems="center">
            <img src={b.imageUrl} alt={b.title} style={{ width: '100%', borderRadius: 8 }} />
            <Typography>{b.title}</Typography>
            <Typography variant="caption">Sort Order: {b.sortOrder}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* Column 2: Manage All Banners */}
      <Stack spacing={3} sx={{ width: '30%' }}>
        <Typography variant="h6">Manage All Banners</Typography>
        {banners.map((b) => (
          <Stack key={b.id} spacing={1} alignItems="center">
            <img src={b.imageUrl} alt={b.title} style={{ width: '100%', borderRadius: 8 }} />
            <Typography>{b.title}</Typography>

            {/* Sort Order Input */}
            <TextField
              label="Sort Order"
              type="number"
              value={b.sortOrder}
              onChange={(e) => {
                const updatedSort = parseInt(e.target.value, 10);
                setBanners((prev) =>
                  prev.map((item) =>
                    item.id === b.id ? { ...item, sortOrder: updatedSort } : item
                  )
                );
              }}
              onBlur={async () => {
                const current = banners.find((x) => x.id === b.id);
                await handleBannerUpdate(current);
              }}
              size="small"
              sx={{ width: 100 }}
            />

            {/* Toggle isActive */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={b.isActive}
                  onChange={async (e) => {
                    const updated = { ...b, isActive: e.target.checked };
                    await handleBannerUpdate(updated);
                  }}
                />
              }
              label="Active"
            />

            {/* Delete Button */}
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(b.id)}
            >
              Delete
            </Button>
          </Stack>
        ))}
      </Stack>

      {/* Column 3: Upload */}
      <Stack spacing={3} sx={{ width: '40%' }}>
        <Typography variant="h4">Upload New Banner</Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <TextField
          label="Sort Order"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(parseInt(e.target.value))}
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
          label="Active"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Upload Banner
        </Button>
        {message && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
