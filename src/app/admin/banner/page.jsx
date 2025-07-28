'use client';

import { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Stack, Typography } from '@mui/material';

export default function AdminBannerPage() {
  const [title, setTitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [banners, setBanners] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banner');
      const data = await res.json();
      console.log('Fetched Banners:', data);
      setBanners(data);
    } catch (err) {
      console.error('Failed to fetch banners:', err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
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
        fetchBanners();
      } else {
        const err = await res.json();
        setMessage(`❌ Failed: ${err.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error occurred while uploading banner.');
    }
  };

  return (
    <Stack direction="row" spacing={4} sx={{ px: 4, py: 5 }}>
      {/* Left: Existing Banners */}
      <Stack spacing={3} sx={{ width: '50%' }}>
        <Typography variant="h6">Existing Banners</Typography>

        {banners.map((b) => (
          <Stack key={b.id} spacing={1} alignItems="center">
            <img
              src={b.imageUrl}
              alt={b.title}
              style={{
                width: '100%', // Make image responsive within column
                maxWidth: 300, // Control max size
                height: 'auto',
                borderRadius: 8,
                objectFit: 'cover',
              }}
            />
            <Typography variant="body1" align="center">
              {b.title}
            </Typography>

            {/* Editable Sort Order */}
            <TextField
              label="Sort Order"
              type="number"
              value={b.sortOrder}
              onChange={(e) => {
                const newOrder = parseInt(e.target.value, 10);
                setBanners((prev) =>
                  prev.map((item) => (item.id === b.id ? { ...item, sortOrder: newOrder } : item))
                );
              }}
              onBlur={async () => {
                await fetch(`/api/admin/banner/${b.id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    sortOrder: b.sortOrder,
                    title: b.title,
                    imageUrl: b.imageUrl,
                    isActive: b.isActive,
                  }),
                });
                fetchBanners(); // refresh after update
              }}
              size="small"
              sx={{ width: 100 }}
            />

            {/* Delete Button */}
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={async () => {
                await fetch(`/api/admin/banner/${b.id}`, {
                  method: 'DELETE',
                });
                fetchBanners(); // refresh after delete
              }}
            >
              Delete
            </Button>
            {/* <Typography variant="body2" align="center" color="text.secondary">
              Sort Order: {b.sortOrder ?? 'N/A'}
            </Typography> */}
          </Stack>
        ))}
      </Stack>

      {/* Right: Upload Form */}
      <Stack spacing={3} sx={{ width: '50%' }}>
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
          onChange={(e) => setSortOrder(parseInt(e.target.value, 10))}
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
