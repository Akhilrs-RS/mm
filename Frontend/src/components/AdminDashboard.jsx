import { useState, useEffect } from 'react';
import logImg from '../assets/log.png';

const apiHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const BACKEND_URL = `http://${apiHost}:5005`;

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Database entities lists
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalCollections: 0,
    activeOffersCount: 0,
    featuredProducts: [],
    mostViewedProducts: [],
    latestInquiries: []
  });
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [dbImages, setDbImages] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Load states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Selection/Modals states
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(null);

  // Forms Visibility
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);

  // Upload/Image Library Modal inside form
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [targetImageField, setTargetImageField] = useState(''); // 'product', 'collection', 'banner'
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Security Account state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    categoryId: '',
    collectionId: '',
    isFeatured: false,
    imageIds: []
  });

  // Category Form State
  const [catForm, setCatForm] = useState({
    name: '',
    description: ''
  });

  // Collection Form State
  const [colForm, setColForm] = useState({
    name: '',
    description: '',
    imageId: '',
    badge: ''
  });

  // Offer Form State
  const [offerForm, setOfferForm] = useState({
    name: '',
    discountPercent: 0,
    startDate: '',
    endDate: '',
    applicableProductIds: []
  });

  // Banner Form State
  const [bannerForm, setBannerForm] = useState({
    name: '',
    imageId: '',
    bannerType: 'Homepage Banner',
    linkUrl: ''
  });

  const username = localStorage.getItem('admin_username') || 'Administrator';

  // API Call helper
  const apiFetch = async (endpoint, options = {}) => {
    setErrorMsg('');
    try {
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, options);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `API error ${response.status}`);
      }
      return await response.json().catch(() => null);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Network error communicating with the server.');
      return null;
    }
  };

  // Load all lists
  const loadData = async () => {
    setIsLoading(true);
    
    // Overview tab stats
    if (activeTab === 'overview') {
      const dashboardStats = await apiFetch('dashboard/stats');
      if (dashboardStats) {
        setStats(dashboardStats);
      }
    }
    
    // Load lists based on active tab
    if (activeTab === 'products' || activeTab === 'offers') {
      const prodsList = await apiFetch('products');
      if (prodsList) setProducts(prodsList);
    }

    if (activeTab === 'categories' || activeTab === 'products') {
      const catsList = await apiFetch('categories');
      if (catsList) setCategories(catsList);
    }

    if (activeTab === 'collections' || activeTab === 'products') {
      const colsList = await apiFetch('collections');
      if (colsList) setCollections(colsList);
    }

    if (activeTab === 'offers') {
      const offersList = await apiFetch('offers');
      if (offersList) setOffers(offersList);
    }

    if (activeTab === 'banners') {
      const bannersList = await apiFetch('banners');
      if (bannersList) setBanners(bannersList);
    }

    if (activeTab === 'inquiries') {
      const inquiriesList = await apiFetch('inquiries');
      if (inquiriesList) setInquiries(inquiriesList);
    }

    // Always keep database images updated
    const imgsList = await apiFetch('admin/images');
    if (imgsList) setDbImages(imgsList);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  // Image upload within Picker Modal
  const handleImageUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append('file', uploadFile);

    setIsUploading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/images`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUploadFile(null);
        const fileInput = document.getElementById('modalImageFileInput');
        if (fileInput) fileInput.value = '';
        
        // Refresh images list
        const imgsList = await apiFetch('admin/images');
        if (imgsList) setDbImages(imgsList);

        // Select the newly uploaded image immediately
        selectImageForField(data.imageId);
      } else {
        alert(data.message || 'Image upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while uploading image.');
    } finally {
      setIsUploading(false);
    }
  };

  const selectImageForField = (imageId) => {
    if (targetImageField === 'product') {
      // Products can have multiple images
      if (!prodForm.imageIds.includes(imageId)) {
        setProdForm(prev => ({
          ...prev,
          imageIds: [...prev.imageIds, imageId]
        }));
      }
    } else if (targetImageField === 'collection') {
      setColForm(prev => ({ ...prev, imageId: imageId }));
    } else if (targetImageField === 'banner') {
      setBannerForm(prev => ({ ...prev, imageId: imageId }));
    }
    setShowImagePicker(false);
  };

  // Image Delete
  const handleImageDelete = async (imageId) => {
    if (!confirm('Are you sure you want to permanently delete this image from the database? This might break entities referencing this image.')) {
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/images/${imageId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh images list
        const imgsList = await apiFetch('admin/images');
        if (imgsList) setDbImages(imgsList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- CRUD HANDLERS ---

  // Category CRUD
  const openAddCategory = () => {
    setCurrentCategory(null);
    setCatForm({ name: '', description: '' });
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat) => {
    setCurrentCategory(cat);
    setCatForm({ name: cat.name, description: cat.description });
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const endpoint = currentCategory ? `categories/${currentCategory.Id}` : 'categories';
    const method = currentCategory ? 'PUT' : 'POST';

    const result = await apiFetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(catForm)
    });

    if (result) {
      setShowCategoryModal(false);
      loadData();
    }
  };

  const handleCategoryDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    const result = await apiFetch(`categories/${id}`, { method: 'DELETE' });
    if (result) loadData();
  };

  // Collection CRUD
  const openAddCollection = () => {
    setCurrentCollection(null);
    setColForm({ name: '', description: '', imageId: '', badge: '' });
    setShowCollectionModal(true);
  };

  const openEditCollection = (col) => {
    setCurrentCollection(col);
    setColForm({
      name: col.name,
      description: col.description,
      imageId: col.imageId || '',
      badge: col.badge || ''
    });
    setShowCollectionModal(true);
  };

  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    const endpoint = currentCollection ? `collections/${currentCollection.Id}` : 'collections';
    const method = currentCollection ? 'PUT' : 'POST';

    // Parse image ID
    const payload = {
      ...colForm,
      imageId: colForm.imageId ? parseInt(colForm.imageId) : null
    };

    const result = await apiFetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (result) {
      setShowCollectionModal(false);
      loadData();
    }
  };

  const handleCollectionDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    const result = await apiFetch(`collections/${id}`, { method: 'DELETE' });
    if (result) loadData();
  };

  // Product CRUD
  const openAddProduct = () => {
    setCurrentProduct(null);
    setProdForm({
      name: '',
      description: '',
      price: 0,
      discount: 0,
      categoryId: categories[0]?.Id || '',
      collectionId: '',
      isFeatured: false,
      imageIds: []
    });
    setShowProductModal(true);
  };

  const openEditProduct = (prod) => {
    setCurrentProduct(prod);
    setProdForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      discount: prod.discount,
      categoryId: prod.categoryId,
      collectionId: prod.collectionId !== 'None' ? prod.collectionId || '' : '',
      isFeatured: prod.isFeatured,
      imageIds: prod.imageIds || []
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const endpoint = currentProduct ? `products/${currentProduct.Id}` : 'products';
    const method = currentProduct ? 'PUT' : 'POST';

    const payload = {
      ...prodForm,
      price: parseFloat(prodForm.price),
      discount: parseFloat(prodForm.discount),
      categoryId: parseInt(prodForm.categoryId),
      collectionId: prodForm.collectionId ? parseInt(prodForm.collectionId) : null,
      imageIds: prodForm.imageIds.map(id => parseInt(id))
    };

    const result = await apiFetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (result) {
      setShowProductModal(false);
      loadData();
    }
  };

  const handleProductDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const result = await apiFetch(`products/${id}`, { method: 'DELETE' });
    if (result) loadData();
  };

  // Offer CRUD
  const openAddOffer = () => {
    setCurrentOffer(null);
    setOfferForm({
      name: '',
      discountPercent: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicableProductIds: []
    });
    setShowOfferModal(true);
  };

  const openEditOffer = (off) => {
    setCurrentOffer(off);
    setOfferForm({
      name: off.name,
      discountPercent: off.discountPercent,
      startDate: off.startDate.split('T')[0],
      endDate: off.endDate.split('T')[0],
      applicableProductIds: off.applicableProductIds || []
    });
    setShowOfferModal(true);
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    const endpoint = currentOffer ? `offers/${currentOffer.Id}` : 'offers';
    const method = currentOffer ? 'PUT' : 'POST';

    const payload = {
      ...offerForm,
      discountPercent: parseFloat(offerForm.discountPercent),
      startDate: new Date(offerForm.startDate).toISOString(),
      endDate: new Date(offerForm.endDate).toISOString(),
      applicableProductIds: offerForm.applicableProductIds.map(id => parseInt(id))
    };

    const result = await apiFetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (result) {
      setShowOfferModal(false);
      loadData();
    }
  };

  const handleOfferDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this offer configuration?')) return;
    const result = await apiFetch(`offers/${id}`, { method: 'DELETE' });
    if (result) loadData();
  };

  // Banner CRUD
  const openAddBanner = () => {
    setCurrentBanner(null);
    setBannerForm({
      name: '',
      imageId: '',
      bannerType: 'Homepage Banner',
      linkUrl: ''
    });
    setShowBannerModal(true);
  };

  const openEditBanner = (ban) => {
    setCurrentBanner(ban);
    setBannerForm({
      name: ban.name,
      imageId: ban.imageId || '',
      bannerType: ban.bannerType,
      linkUrl: ban.linkUrl || ''
    });
    setShowBannerModal(true);
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    if (!bannerForm.imageId) {
      alert('Please upload/select a banner image.');
      return;
    }

    const endpoint = currentBanner ? `banners/${currentBanner.Id}` : 'banners';
    const method = currentBanner ? 'PUT' : 'POST';

    const payload = {
      ...bannerForm,
      imageId: parseInt(bannerForm.imageId)
    };

    const result = await apiFetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (result) {
      setShowBannerModal(false);
      loadData();
    }
  };

  const handleBannerDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    const result = await apiFetch(`banners/${id}`, { method: 'DELETE' });
    if (result) loadData();
  };

  // Inquiries Delete
  const handleInquiryDelete = async (id) => {
    if (!confirm('Are you sure you want to archive/delete this inquiry?')) return;
    const result = await apiFetch(`inquiries/${id}`, { method: 'DELETE' });
    if (result) loadData();
  };

  // Change Password
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
      const response = await fetch(`${BACKEND_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPasswordSuccess('Administrator password updated successfully.');
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

  // Toggle applicable product checklist in Offer Form
  const toggleProductForOffer = (prodId) => {
    setOfferForm(prev => {
      const currentIds = prev.applicableProductIds;
      if (currentIds.includes(prodId)) {
        return {
          ...prev,
          applicableProductIds: currentIds.filter(id => id !== prodId)
        };
      } else {
        return {
          ...prev,
          applicableProductIds: [...currentIds, prodId]
        };
      }
    });
  };

  // UI icon helpers
  const StatsIcon = ({ type }) => {
    if (type === 'products') {
      return (
        <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      );
    }
    if (type === 'categories') {
      return (
        <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l5.178-5.178a2.25 2.25 0 000-3.182L12.018 3.659A2.25 2.25 0 0010.427 3h-.859z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
        </svg>
      );
    }
    if (type === 'offers') {
      return (
        <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans select-none relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Admin Header */}
      <header className="w-full bg-black border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <img src={logImg} alt="MM Jewellery Logo" className="h-9 w-auto object-contain" />
            <span className="font-serif text-[10px] tracking-[0.2em] text-gold-400 font-semibold uppercase whitespace-nowrap leading-none">
              MM Jewellery
            </span>
          </div>
          <span className="h-6 w-[1px] bg-neutral-800 hidden sm:inline ml-1"></span>
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

      {/* Main Grid Wrapper */}
      <div className="flex-grow container mx-auto px-6 md:px-12 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 space-y-2 sticky top-24">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'products' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Product Management
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'categories' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Category Management
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'collections' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Collection Management
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'offers' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Offer Management
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'banners' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Banner Management
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'inquiries' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Customer Inquiries
            </button>
            <div className="h-[1px] bg-white/5 my-2"></div>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'security' ? 'bg-[#aa7c11] text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Security Settings
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-grow min-w-0">
          
          {/* General API error alerts */}
          {errorMsg && (
            <div className="bg-red-950/40 border border-red-500/20 text-red-300 rounded-2xl p-4 text-sm leading-relaxed mb-6 font-light">
              {errorMsg}
            </div>
          )}

          {/* 1. OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">Dashboard Overview</h3>
                <p className="text-neutral-400 text-xs font-light">
                  General administrative statistics, featured listings, and latest customer inquiries.
                </p>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-light mb-1">Total Products</p>
                    <h4 className="text-3xl font-bold text-white">{stats.totalProducts}</h4>
                  </div>
                  <div className="w-12 h-12 bg-gold-400/5 rounded-full flex items-center justify-center border border-gold-400/10">
                    <StatsIcon type="products" />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-light mb-1">Total Categories</p>
                    <h4 className="text-3xl font-bold text-white">{stats.totalCategories}</h4>
                  </div>
                  <div className="w-12 h-12 bg-gold-400/5 rounded-full flex items-center justify-center border border-gold-400/10">
                    <StatsIcon type="categories" />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-light mb-1">Active Offers</p>
                    <h4 className="text-3xl font-bold text-white">{stats.activeOffersCount}</h4>
                  </div>
                  <div className="w-12 h-12 bg-gold-400/5 rounded-full flex items-center justify-center border border-gold-400/10">
                    <StatsIcon type="offers" />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-light mb-1">Collections</p>
                    <h4 className="text-3xl font-bold text-white">{stats.totalCollections}</h4>
                  </div>
                  <div className="w-12 h-12 bg-gold-400/5 rounded-full flex items-center justify-center border border-gold-400/10">
                    <StatsIcon type="collections" />
                  </div>
                </div>
              </div>

              {/* Analytical Split Columns */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left Side: Featured and Most Viewed */}
                <div className="xl:col-span-7 space-y-8">
                  {/* Featured Products */}
                  <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
                    <h4 className="font-serif text-lg font-medium mb-4 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold-400"></span>
                      Featured Products
                    </h4>
                    {stats.featuredProducts.length === 0 ? (
                      <p className="text-neutral-500 text-xs py-4">No products are marked as featured.</p>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {stats.featuredProducts.map(prod => (
                          <div key={prod.id} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              {prod.imageUrl ? (
                                <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0 border border-white/5" />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center text-[10px] text-neutral-600 border border-white/5 shrink-0">No Image</div>
                              )}
                              <div className="truncate">
                                <p className="text-sm font-semibold truncate text-white">{prod.name}</p>
                                <p className="text-[10px] text-neutral-400">{prod.categoryName}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-medium text-gold-400">₹{prod.price}</p>
                              {prod.discount > 0 && <p className="text-[10px] text-emerald-400">{prod.discount}% off</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Most Viewed Products */}
                  <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
                    <h4 className="font-serif text-lg font-medium mb-4 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold-400"></span>
                      Most Viewed Products
                    </h4>
                    {stats.mostViewedProducts.length === 0 ? (
                      <p className="text-neutral-500 text-xs py-4">No view logs recorded yet.</p>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {stats.mostViewedProducts.map(prod => (
                          <div key={prod.id} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              {prod.imageUrl ? (
                                <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0 border border-white/5" />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center text-[10px] text-neutral-600 border border-white/5 shrink-0">No Image</div>
                              )}
                              <div className="truncate">
                                <p className="text-sm font-semibold truncate text-white">{prod.name}</p>
                                <p className="text-[10px] text-neutral-400">{prod.categoryName}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 flex flex-col items-end">
                              <span className="text-xs bg-neutral-800 text-neutral-300 py-1 px-2.5 rounded-full font-medium">
                                {prod.viewsCount} views
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Latest Inquiries */}
                <div className="xl:col-span-5">
                  <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 h-full flex flex-col">
                    <h4 className="font-serif text-lg font-medium mb-4 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold-400"></span>
                      Latest Inquiries
                    </h4>
                    {stats.latestInquiries.length === 0 ? (
                      <p className="text-neutral-500 text-xs py-4 flex-grow">No inquiries received yet.</p>
                    ) : (
                      <div className="space-y-4 flex-grow overflow-y-auto max-h-[500px] pr-2">
                        {stats.latestInquiries.map(inq => (
                          <div key={inq.id} className="bg-black/30 border border-neutral-850 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-semibold text-white">{inq.customerName}</h5>
                              <span className="text-[9px] text-neutral-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[10px] text-neutral-400 truncate">{inq.email} • {inq.phone}</p>
                            <p className="text-xs text-neutral-300 leading-relaxed font-light italic bg-black/40 p-2.5 rounded border border-white/5">
                              "{inq.message}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Product Management</h3>
                  <p className="text-neutral-400 text-xs font-light">Create, edit, and delete catalogue items.</p>
                </div>
                <button
                  onClick={openAddProduct}
                  className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Add Product
                </button>
              </div>

              {/* Products Table Card */}
              <div className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-black/40 border-b border-white/5 text-neutral-400 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6 font-medium">Image</th>
                        <th className="py-4 px-6 font-medium">Product Name</th>
                        <th className="py-4 px-6 font-medium">Category</th>
                        <th className="py-4 px-6 font-medium">Collection</th>
                        <th className="py-4 px-6 font-medium">Price</th>
                        <th className="py-4 px-6 font-medium">Discount</th>
                        <th className="py-4 px-6 font-medium text-center">Featured</th>
                        <th className="py-4 px-6 text-center font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map(prod => (
                        <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6">
                            {prod.imageUrls && prod.imageUrls.length > 0 ? (
                              <img src={prod.imageUrls[0]} alt="" className="w-12 h-12 object-cover rounded-lg bg-neutral-950 border border-white/10" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-neutral-950 flex items-center justify-center text-[10px] text-neutral-600 border border-white/10">No Image</div>
                            )}
                          </td>
                          <td className="py-4 px-6 font-medium text-white max-w-[200px] truncate" title={prod.name}>
                            {prod.name}
                          </td>
                          <td className="py-4 px-6 text-neutral-300">{prod.categoryName}</td>
                          <td className="py-4 px-6 text-neutral-450">{prod.collectionName}</td>
                          <td className="py-4 px-6 font-semibold text-gold-400">₹{prod.price}</td>
                          <td className="py-4 px-6 text-emerald-400">{prod.discount}%</td>
                          <td className="py-4 px-6 text-center">
                            {prod.isFeatured ? (
                              <span className="bg-gold-500/10 text-gold-400 text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full border border-gold-400/20">Yes</span>
                            ) : (
                              <span className="text-neutral-600 text-xs">No</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => openEditProduct(prod)}
                                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleProductDelete(prod.id)}
                                className="text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. CATEGORY MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Category Management</h3>
                  <p className="text-neutral-400 text-xs font-light">Create, edit, and delete product categories.</p>
                </div>
                <button
                  onClick={openAddCategory}
                  className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Create Category
                </button>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-44">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white mb-2 truncate">{cat.name}</h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                        {cat.description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-4 border-t border-white/5 pt-3">
                      <button
                        onClick={() => openEditCategory(cat)}
                        className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCategoryDelete(cat.id)}
                        className="text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. COLLECTION MANAGEMENT */}
          {activeTab === 'collections' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Collection Management</h3>
                  <p className="text-neutral-400 text-xs font-light">Manage catalog collections and marketing badges.</p>
                </div>
                <button
                  onClick={openAddCollection}
                  className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Create Collection
                </button>
              </div>

              {/* Collections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {collections.map(col => {
                  const linkedImage = dbImages.find(img => img.id === col.imageId);
                  const imageUrl = linkedImage ? `${BACKEND_URL}/api/admin/images/${col.imageId}` : null;
                  return (
                    <div key={col.id} className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group">
                      {/* Image header */}
                      <div className="h-40 bg-black flex items-center justify-center overflow-hidden relative border-b border-white/5">
                        {imageUrl ? (
                          <img src={imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <span className="text-xs text-neutral-600 uppercase tracking-widest font-light">No Header Image</span>
                        )}
                        {col.badge && (
                          <span className="absolute top-3 right-3 bg-gold-450/90 text-black text-[9px] font-bold tracking-widest uppercase py-1 px-2.5 rounded-full">
                            {col.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Info & Footer */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-white mb-2 truncate">{col.name}</h4>
                          <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                            {col.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-3">
                          <button
                            onClick={() => openEditCollection(col)}
                            className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleCollectionDelete(col.id)}
                            className="text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. OFFER MANAGEMENT */}
          {activeTab === 'offers' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Offer Management</h3>
                  <p className="text-neutral-400 text-xs font-light">Configure promotional discounts and assign applicable products.</p>
                </div>
                <button
                  onClick={openAddOffer}
                  className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Create Offer
                </button>
              </div>

              {/* Offers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map(off => (
                  <div key={off.id} className="bg-neutral-900 border border-white/5 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-serif text-lg font-bold text-white truncate">{off.name}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full ${
                          off.isActive 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' 
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700/50'
                        }`}>
                          {off.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 bg-black/40 border border-white/5 rounded-xl p-3.5 text-xs">
                        <div>
                          <p className="text-neutral-500 uppercase tracking-wider mb-1 font-light text-[9px]">Discount</p>
                          <p className="text-base font-bold text-emerald-400">{off.discountPercent}% OFF</p>
                        </div>
                        <div>
                          <p className="text-neutral-500 uppercase tracking-wider mb-1 font-light text-[9px]">Products Linked</p>
                          <p className="text-base font-bold text-neutral-350">{off.applicableProductIds?.length || 0} items</p>
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-400 space-y-1">
                        <p><strong className="text-neutral-300 font-medium">Starts:</strong> {new Date(off.startDate).toLocaleDateString()}</p>
                        <p><strong className="text-neutral-300 font-medium">Ends:</strong> {new Date(off.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-3">
                      <button
                        onClick={() => openEditOffer(off)}
                        className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Edit Configuration
                      </button>
                      <button
                        onClick={() => handleOfferDelete(off.id)}
                        className="text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. BANNER MANAGEMENT */}
          {activeTab === 'banners' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Banner Management</h3>
                  <p className="text-neutral-400 text-xs font-light">Upload and organize Homepage, Collection, and Promotional banners.</p>
                </div>
                <button
                  onClick={openAddBanner}
                  className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Upload Banner
                </button>
              </div>

              {/* Banners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map(ban => (
                  <div key={ban.id} className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group">
                    <div className="h-44 bg-black overflow-hidden relative border-b border-white/5">
                      <img src={ban.imageUrl} alt={ban.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-black/85 backdrop-blur text-gold-400 text-[9px] font-bold tracking-widest uppercase py-1.5 px-3 rounded-full border border-white/10">
                        {ban.bannerType}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h4 className="font-serif text-base font-bold text-white truncate">{ban.name}</h4>
                        <p className="text-[11px] text-neutral-400 truncate mt-1">
                          <strong className="text-neutral-300 font-medium">Link:</strong> {ban.linkUrl || 'None'}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-3">
                        <button
                          onClick={() => openEditBanner(ban)}
                          className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleBannerDelete(ban.id)}
                          className="text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. CUSTOMER INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Customer Inquiries</h3>
                <p className="text-neutral-400 text-xs font-light">Read and archive submissions received from the customer service contacts.</p>
              </div>

              {/* Inquiries table/list */}
              <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 space-y-4">
                {inquiries.length === 0 ? (
                  <p className="text-neutral-500 text-xs text-center py-8">No customer inquiries found.</p>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map(inq => (
                      <div key={inq.id} className="bg-black/40 border border-neutral-850 rounded-xl p-5 space-y-3 relative group">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-white">{inq.customerName}</h4>
                            <p className="text-[11px] text-neutral-400">{inq.email} • {inq.phone || 'No phone number'}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-neutral-500">{new Date(inq.createdAt).toLocaleString()}</span>
                            <button
                              onClick={() => handleInquiryDelete(inq.id)}
                              className="text-xs uppercase tracking-wider text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              Archive / Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-350 leading-relaxed font-light italic bg-black/30 p-3 rounded border border-white/5">
                          "{inq.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 8. SECURITY SETTINGS */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Security Settings</h3>
                <p className="text-neutral-400 text-xs font-light">Update credentials used to access the administrator panel.</p>
              </div>

              {/* Password update form */}
              <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 md:p-8 max-w-xl">
                <h4 className="font-serif text-lg font-medium text-white mb-6">Change Password</h4>

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
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">Current Password</label>
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
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">New Password</label>
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
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">Confirm New Password</label>
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

      {/* --- FORM DIALOG MODALS --- */}

      {/* A. PRODUCT DIALOG MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h4 className="font-serif text-xl font-bold text-white">
                  {currentProduct ? 'Edit Product Configuration' : 'Add New Jewellery Product'}
                </h4>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-neutral-400 hover:text-white transition-colors text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Product Name</label>
                    <input
                      type="text"
                      required
                      value={prodForm.name}
                      onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                      placeholder="e.g. Diamond Choker"
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Category</label>
                    <select
                      value={prodForm.categoryId}
                      onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id} className="bg-neutral-900">{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Price (₹)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={prodForm.discount}
                      onChange={(e) => setProdForm({ ...prodForm, discount: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Collection</label>
                    <select
                      value={prodForm.collectionId}
                      onChange={(e) => setProdForm({ ...prodForm, collectionId: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    >
                      <option value="">None</option>
                      {collections.map(col => (
                        <option key={col.id} value={col.id} className="bg-neutral-900">{col.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Description</label>
                  <textarea
                    rows="3"
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    placeholder="Enter detailed description of craftsmanship..."
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                {/* Product Image Selection list */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Product Images ({prodForm.imageIds.length} Selected)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setTargetImageField('product');
                        setShowImagePicker(true);
                      }}
                      className="text-xs text-gold-400 hover:text-white transition-colors cursor-pointer"
                    >
                      + Add / Select Image
                    </button>
                  </div>
                  
                  {prodForm.imageIds.length === 0 ? (
                    <p className="text-[11px] text-neutral-500 italic bg-black/20 p-3 rounded border border-neutral-850">No images linked to this product yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-3 bg-black/40 border border-neutral-850 rounded-xl p-3">
                      {prodForm.imageIds.map(imgId => (
                        <div key={imgId} className="relative w-14 h-14 bg-neutral-950 rounded-lg border border-white/5 overflow-hidden group">
                          <img src={`${BACKEND_URL}/api/admin/images/${imgId}`} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setProdForm(prev => ({
                              ...prev,
                              imageIds: prev.imageIds.filter(id => id !== imgId)
                            }))}
                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] hover:bg-red-500 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2.5 py-1">
                  <input
                    type="checkbox"
                    id="isFeaturedCheck"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-gold-400 accent-[#aa7c11] focus:ring-0 focus:ring-offset-0 rounded border-neutral-800"
                  />
                  <label htmlFor="isFeaturedCheck" className="text-xs uppercase tracking-wider text-neutral-300 font-medium cursor-pointer">
                    Mark as Featured Product
                  </label>
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-2.5 px-5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentProduct ? 'Save Changes' : 'Add to Catalogue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* B. CATEGORY DIALOG MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-md shadow-2xl relative">
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h4 className="font-serif text-lg font-bold text-white">
                  {currentCategory ? 'Edit Category' : 'Create New Category'}
                </h4>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Category Name</label>
                  <input
                    type="text"
                    required
                    value={catForm.name}
                    onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    placeholder="e.g. Necklaces"
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Description</label>
                  <textarea
                    rows="3"
                    value={catForm.description}
                    onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    placeholder="Describe this category's collections..."
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-2 px-4 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2 px-5 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentCategory ? 'Save' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* C. COLLECTION DIALOG MODAL */}
      {showCollectionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-md shadow-2xl relative">
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h4 className="font-serif text-lg font-bold text-white">
                  {currentCollection ? 'Edit Collection' : 'Create New Collection'}
                </h4>
                <button
                  onClick={() => setShowCollectionModal(false)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCollectionSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Collection Name</label>
                  <input
                    type="text"
                    required
                    value={colForm.name}
                    onChange={(e) => setColForm({ ...colForm, name: e.target.value })}
                    placeholder="e.g. Bridal Collection"
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Badge Text</label>
                  <input
                    type="text"
                    value={colForm.badge}
                    onChange={(e) => setColForm({ ...colForm, badge: e.target.value })}
                    placeholder="e.g. Up to 25% off"
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Description</label>
                  <textarea
                    rows="3"
                    value={colForm.description}
                    onChange={(e) => setColForm({ ...colForm, description: e.target.value })}
                    placeholder="Provide background history..."
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                {/* Image field */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Header Image</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setTargetImageField('collection');
                        setShowImagePicker(true);
                      }}
                      className="bg-neutral-800 hover:bg-neutral-750 text-xs px-4 py-2 rounded-lg border border-white/5 transition-colors cursor-pointer"
                    >
                      {colForm.imageId ? 'Change Image' : 'Select Image'}
                    </button>
                    {colForm.imageId && (
                      <img src={`${BACKEND_URL}/api/admin/images/${colForm.imageId}`} alt="" className="w-10 h-10 object-cover rounded-lg border border-white/5" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCollectionModal(false)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-2 px-4 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2 px-5 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentCollection ? 'Save' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* D. OFFER CONFIGURATION DIALOG MODAL */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h4 className="font-serif text-xl font-bold text-white">
                  {currentOffer ? 'Edit Offer Configuration' : 'Configure New Offer Campaign'}
                </h4>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="text-neutral-400 hover:text-white transition-colors text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleOfferSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Offer Name</label>
                    <input
                      type="text"
                      required
                      value={offerForm.name}
                      onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })}
                      placeholder="e.g. Bridal Season Sale"
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Discount Percentage (%)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="100"
                      value={offerForm.discountPercent}
                      onChange={(e) => setOfferForm({ ...offerForm, discountPercent: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">Start Date</label>
                    <input
                      type="date"
                      required
                      value={offerForm.startDate}
                      onChange={(e) => setOfferForm({ ...offerForm, startDate: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400">End Date</label>
                    <input
                      type="date"
                      required
                      value={offerForm.endDate}
                      onChange={(e) => setOfferForm({ ...offerForm, endDate: e.target.value })}
                      className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                </div>

                {/* Applicable Products Selection */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    Applicable Products ({offerForm.applicableProductIds.length} Linked)
                  </label>
                  
                  <div className="max-h-52 overflow-y-auto border border-neutral-850 bg-black/30 rounded-xl p-3 divide-y divide-white/5">
                    {products.length === 0 ? (
                      <p className="text-[11px] text-neutral-500 italic p-2">No products in catalog to link.</p>
                    ) : (
                      products.map(prod => {
                        const isChecked = offerForm.applicableProductIds.includes(prod.id);
                        return (
                          <div
                            key={prod.id}
                            onClick={() => toggleProductForOffer(prod.id)}
                            className="flex items-center gap-3 py-2 cursor-pointer hover:bg-white/[0.02]"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="w-3.5 h-3.5 text-gold-450 accent-[#aa7c11] rounded border-neutral-800 pointer-events-none"
                            />
                            <div className="text-xs">
                              <p className="text-white font-medium">{prod.name}</p>
                              <p className="text-[9px] text-neutral-500">{prod.categoryName} • ₹{prod.price}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOfferModal(false)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-2 px-4 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentOffer ? 'Save Configuration' : 'Create Campaign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* E. BANNER DIALOG MODAL */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-md shadow-2xl relative">
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h4 className="font-serif text-lg font-bold text-white">
                  {currentBanner ? 'Edit Banner Configuration' : 'Configure New Banner'}
                </h4>
                <button
                  onClick={() => setShowBannerModal(false)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBannerSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Banner Name</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.name}
                    onChange={(e) => setBannerForm({ ...bannerForm, name: e.target.value })}
                    placeholder="e.g. Festival Banner"
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Banner Type</label>
                  <select
                    value={bannerForm.bannerType}
                    onChange={(e) => setBannerForm({ ...bannerForm, bannerType: e.target.value })}
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="Homepage Banner">Homepage Banner</option>
                    <option value="Collection Banner">Collection Banner</option>
                    <option value="Promotional Banner">Promotional Banner</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Target Link URL</label>
                  <input
                    type="text"
                    value={bannerForm.linkUrl}
                    onChange={(e) => setBannerForm({ ...bannerForm, linkUrl: e.target.value })}
                    placeholder="e.g. #collections"
                    className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                {/* Image selection */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400">Banner Image</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setTargetImageField('banner');
                        setShowImagePicker(true);
                      }}
                      className="bg-neutral-800 hover:bg-neutral-750 text-xs px-4 py-2 rounded-lg border border-white/5 transition-colors cursor-pointer"
                    >
                      {bannerForm.imageId ? 'Change Image' : 'Select Image'}
                    </button>
                    {bannerForm.imageId && (
                      <img src={`${BACKEND_URL}/api/admin/images/${bannerForm.imageId}`} alt="" className="w-16 h-10 object-cover rounded-lg border border-white/5" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBannerModal(false)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-2 px-4 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-xs tracking-widest uppercase py-2 px-5 rounded-lg transition-colors cursor-pointer"
                  >
                    {currentBanner ? 'Save' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* F. IMAGE PICKER & DB UPLOADER SUB-MODAL */}
      {showImagePicker && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <h5 className="font-serif text-lg font-bold text-white">Select Image Asset</h5>
              <button
                onClick={() => setShowImagePicker(false)}
                className="text-neutral-400 hover:text-white transition-colors text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content area: Upload + Gallery */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              
              {/* Internal Uploader box */}
              <div className="bg-black/45 border border-white/5 rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">Upload new asset</p>
                <form onSubmit={handleImageUploadSubmit} className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    id="modalImageFileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-3.5 file:rounded file:border-0 file:text-[10px] file:font-semibold file:uppercase file:tracking-wide file:bg-neutral-800 file:text-neutral-250 hover:file:bg-neutral-700 file:cursor-pointer"
                  />
                  <button
                    type="submit"
                    disabled={isUploading || !uploadFile}
                    className="bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-[10px] tracking-widest uppercase py-2.5 px-4 rounded shadow transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                  >
                    {isUploading ? 'Uploading...' : 'Save to DB'}
                  </button>
                </form>
              </div>

              {/* Gallery Grid */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Select from DB Library</p>
                
                {dbImages.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic py-4">No image assets found inside database.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {dbImages.map(image => (
                      <div
                        key={image.id}
                        className="group bg-black/40 border border-neutral-850 rounded-lg overflow-hidden flex flex-col justify-between relative cursor-pointer hover:border-gold-400/50"
                      >
                        <div
                          onClick={() => selectImageForField(image.id)}
                          className="aspect-square bg-neutral-950 flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={`${BACKEND_URL}/api/admin/images/${image.id}`}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-1.5 flex items-center justify-between gap-1 text-[9px] border-t border-neutral-850 bg-black/20">
                          <span className="truncate text-neutral-400" title={image.name}>{image.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageDelete(image.id);
                            }}
                            className="text-red-500 hover:text-red-400 shrink-0 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="p-6 border-t border-white/5 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowImagePicker(false)}
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-2 px-4 cursor-pointer"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
