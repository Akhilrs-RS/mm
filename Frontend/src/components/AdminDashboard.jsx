import { useState, useEffect } from 'react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('images');
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [imagesError, setImagesError] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Upload image state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const username = localStorage.getItem('admin_username') || 'Administrator';

  // Load images metadata from backend database
  const fetchImages = async () => {
    setIsLoadingImages(true);
    setImagesError('');
    try {
      const response = await fetch('http://localhost:5005/api/admin/images');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        setImagesError('Failed to retrieve images list from database.');
      }
    } catch (err) {
      console.error(err);
      setImagesError('Could not reach backend API. Ensure C# server is running.');
    } finally {
      setIsLoadingImages(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'images') {
      fetchImages();
    }
  }, [activeTab]);

  // Image Upload handler
  const handleImageUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');

    if (!uploadFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);

    setIsUploading(true);
    try {
      const response = await fetch('http://localhost:5005/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUploadSuccess(data.message || 'Image uploaded and stored in MySQL successfully.');
        setUploadFile(null);
        // Clear file input manually
        const fileInput = document.getElementById('imageFileInput');
        if (fileInput) fileInput.value = '';
        
        fetchImages();
      } else {
        setUploadError(data.message || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setUploadError('Network error uploading file.');
    } finally {
      setIsUploading(false);
    }
  };

  // Image Delete handler
  const handleImageDelete = async (imageId) => {
    if (!confirm('Are you sure you want to permanently delete this image from the database?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5005/api/admin/images/${imageId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok && data.success) {
        fetchImages();
      } else {
        alert(data.message || 'Failed to delete image.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while deleting image.');
    }
  };

  // Change Password handler
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All password fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const response = await fetch('http://localhost:5005/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPasswordSuccess('Administrator password updated successfully in the database.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(data.message || 'Failed to update password.');
      }
    } catch (err) {
      console.error(err);
      setPasswordError('Network error while updating password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans select-none">
      {/* Admin Header */}
      <header className="w-full bg-black border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <span className="font-serif text-lg tracking-[0.2em] text-gold-400 font-semibold uppercase">
            MM Jewellery
          </span>
          <span className="h-5 w-[1px] bg-neutral-800 hidden sm:inline"></span>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-light hidden sm:inline">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400 font-light hidden md:inline">
            Logged in as: <strong className="text-white font-medium">{username}</strong>
          </span>
          <button
            onClick={onLogout}
            className="text-xs uppercase tracking-wider border border-white/10 hover:border-gold-400/50 hover:text-gold-400 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-grow container mx-auto px-6 md:px-12 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 space-y-2">
            <button
              onClick={() => setActiveTab('images')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'images'
                  ? 'bg-[#aa7c11] text-white font-medium'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Image Database Manager
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#aa7c11] text-white font-medium'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Account & Credentials
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-grow">
          {activeTab === 'images' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Media Database Heading */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Image Database Manager
                </h3>
                <p className="text-neutral-400 text-xs font-light tracking-wide">
                  Upload, view, and remove image assets stored directly inside the MySQL database as binary BLOB data.
                </p>
              </div>

              {/* Upload Image Section */}
              <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 relative">
                <h4 className="font-serif text-lg font-medium text-white mb-4">
                  Upload Jewellery Asset
                </h4>

                {uploadError && (
                  <div className="bg-red-950/40 border border-red-500/20 text-red-300 rounded-lg p-3 text-xs mb-4">
                    {uploadError}
                  </div>
                )}
                {uploadSuccess && (
                  <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 rounded-lg p-3 text-xs mb-4">
                    {uploadSuccess}
                  </div>
                )}

                <form onSubmit={handleImageUploadSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <div className="flex-grow">
                    <input
                      id="imageFileInput"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUploadFile(e.target.files[0])}
                      disabled={isUploading}
                      className="w-full text-sm text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 file:cursor-pointer"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-3 px-6 rounded-lg shadow transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    {isUploading ? 'Uploading...' : 'Save to DB'}
                  </button>
                </form>
              </div>

              {/* Images Grid list */}
              <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
                <h4 className="font-serif text-lg font-medium text-white mb-6">
                  Stored Media Collection
                </h4>

                {imagesError && (
                  <div className="bg-red-950/40 border border-red-500/20 text-red-300 rounded-lg p-3 text-xs mb-4">
                    {imagesError}
                  </div>
                )}

                {isLoadingImages ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-gold-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest font-light">Loading assets...</p>
                  </div>
                ) : images.length === 0 ? (
                  <div className="py-16 text-center text-neutral-500">
                    <svg className="w-12 h-12 mx-auto text-neutral-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-light">No image assets found inside the database.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {images.map((image) => (
                      <div key={image.id} className="group bg-black/40 border border-neutral-800 rounded-xl overflow-hidden shadow-md flex flex-col justify-between relative">
                        {/* Image preview */}
                        <div className="aspect-square bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-neutral-800 relative">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Hover Overlay Delete trigger */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            <a
                              href={image.url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-neutral-850 hover:bg-neutral-750 text-white font-medium text-[10px] tracking-wider uppercase py-1.5 px-3 rounded border border-white/10"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handleImageDelete(image.id)}
                              className="bg-red-950 hover:bg-red-850 text-red-200 font-medium text-[10px] tracking-wider uppercase py-1.5 px-3 rounded border border-red-500/20 cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* File details */}
                        <div className="p-3">
                          <p className="text-white text-xs font-semibold truncate" title={image.name}>
                            {image.name}
                          </p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-wide mt-1">
                            ID: {image.id} • {image.contentType.split('/')[1]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Security Heading */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Account & Security Credentials
                </h3>
                <p className="text-neutral-400 text-xs font-light tracking-wide">
                  Change the login password for the administrator account. All updates are encrypted and stored in the database.
                </p>
              </div>

              {/* Password update form */}
              <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 md:p-8 max-w-xl">
                <h4 className="font-serif text-lg font-medium text-white mb-6">
                  Change Credentials Password
                </h4>

                {passwordError && (
                  <div className="bg-red-950/40 border border-red-500/20 text-red-300 rounded-lg p-3 text-xs mb-6">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 rounded-lg p-3 text-xs mb-6">
                    {passwordSuccess}
                  </div>
                )}

                <form onSubmit={handlePasswordChangeSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={isUpdatingPassword}
                      placeholder="Enter current password"
                      className="w-full bg-black/60 border border-neutral-850 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isUpdatingPassword}
                      placeholder="Enter new password (min. 6 characters)"
                      className="w-full bg-black/60 border border-neutral-850 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isUpdatingPassword}
                      placeholder="Confirm new password"
                      className="w-full bg-black/60 border border-neutral-850 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-3.5 px-6 rounded-lg shadow-lg hover:shadow-gold-500/10 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isUpdatingPassword ? 'Saving Changes...' : 'Update Password'}
                  </button>
                </form>
              </div>

            </div>
          )}
        </main>

      </div>
    </div>
  );
}
