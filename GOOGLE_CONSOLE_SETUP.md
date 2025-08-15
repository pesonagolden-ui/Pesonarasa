# 🔧 Google Console Setup untuk pesona-rasa.netlify.app

## ❌ MASALAH SAAT INI:
1. Domain `pesona-rasa.netlify.app` belum ditambahkan ke Google Console
2. Google Drive API belum diaktifkan
3. Scope permissions belum dikonfigurasi dengan benar

## 🎯 TARGET API KEYS:
- **API Key**: `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`
- **Client ID**: `733822404446-m293n75ai4bo96c1lp1fb26vev3ktd43.apps.googleusercontent.com`

## ✅ SOLUSI LANGKAH DEMI LANGKAH:

### **STEP 1: Buka Google Cloud Console**
1. Pergi ke: https://console.cloud.google.com/
2. Login dengan akun Google yang sama dengan API keys
3. Pilih project yang berisi Client ID: `733822404446-m293n75ai4bo96c1lp1fb26vev3ktd43`

### **STEP 1.5: Aktifkan Google Drive API**
1. Di sidebar kiri, klik **"APIs & Services"**
2. Klik **"Library"**
3. Search **"Google Drive API"**
4. Klik **"Google Drive API"**
5. Klik **"Enable"** jika belum aktif
6. Ulangi untuk **"Google+ API"** (untuk profile info)

### **STEP 2: Navigate ke Credentials**
1. Di sidebar kiri, klik **"APIs & Services"**
2. Klik **"Credentials"**
3. Cari OAuth 2.0 Client ID dengan ID: `733822404446-m293n75ai4bo96c1lp1fb26vev3ktd43`
4. Klik **Edit** (icon pensil)

### **STEP 3: Tambahkan Authorized Origins**
Di bagian **"Authorized JavaScript origins"**, tambahkan:

```
https://pesona-rasa.netlify.app
```

**PENTING:** 
- Gunakan `https://` (bukan `http://`)
- Jangan tambahkan trailing slash `/`
- Pastikan domain exact match

### **STEP 4: Tambahkan Authorized Redirect URIs**
Di bagian **"Authorized redirect URIs"**, tambahkan:

```
https://pesona-rasa.netlify.app
https://pesona-rasa.netlify.app/
```

### **STEP 5: Save Changes**
1. Klik **"Save"** di bagian bawah
2. Tunggu beberapa menit untuk propagasi (biasanya 5-10 menit)

## 🧪 TESTING SETELAH KONFIGURASI:

### **Test 1: Clear Browser Cache**
```
1. Buka pesona-rasa.netlify.app
2. Tekan Ctrl+Shift+R (hard refresh)
3. Klik "Sign in with Google"
4. Popup Google OAuth harus muncul
```

### **Test 2: Incognito Mode**
```
1. Buka browser incognito/private
2. Pergi ke pesona-rasa.netlify.app  
3. Test Google login
4. Verify profile info muncul
```

## 🔧 TROUBLESHOOTING:

### **Jika Masih Error "Authentication failed":**

1. **Check Domain Spelling**
   - Pastikan `pesona-rasa.netlify.app` (dengan dash, bukan underscore)
   - Case sensitive, pastikan lowercase semua

2. **Wait for Propagation**
   - Google Console changes butuh 5-10 menit
   - Clear browser cache setelah menunggu

3. **Check Browser Console**
   - Buka F12 → Console tab
   - Lihat error message detail
   - Screenshot error untuk debugging

4. **Verify Project**
   - Pastikan edit OAuth client yang benar
   - Client ID harus match: `733822404446-m293n75ai4bo96c1lp1fb26vev3ktd43`

### **Jika Popup Blocked:**
```
1. Allow popups untuk pesona-rasa.netlify.app
2. Disable popup blocker sementara
3. Try different browser
```

### **Jika Access Denied:**
```
1. Make sure Google account has access
2. Try different Google account
3. Check if account is restricted
```

## 📋 CHECKLIST KONFIGURASI:

- [ ] Login ke Google Cloud Console
- [ ] Pilih project yang benar
- [ ] Navigate ke APIs & Services > Credentials  
- [ ] Edit OAuth 2.0 Client ID yang benar
- [ ] Tambahkan `https://pesona-rasa.netlify.app` ke Authorized JavaScript origins
- [ ] Tambahkan redirect URIs
- [ ] Save changes
- [ ] Wait 5-10 minutes
- [ ] Clear browser cache
- [ ] Test login di pesona-rasa.netlify.app

## 🎯 EXPECTED RESULT:

Setelah konfigurasi benar:

```
1. User klik "Sign in with Google"
   ↓
2. Google OAuth popup muncul
   ↓  
3. User login dengan Google account
   ↓
4. Popup close, profile info muncul
   ↓
5. Button berubah jadi "👤 [Nama User]"
   ↓
6. User bisa add to cart dan checkout
```

## 📞 SUPPORT:

**Jika masih bermasalah setelah mengikuti panduan:**

1. **Screenshot error** di browser console
2. **Verify domain** di Google Console sudah benar
3. **Test di browser** yang berbeda
4. **Wait longer** (sampai 30 menit) untuk propagasi

---

## 🚀 SETELAH KONFIGURASI SELESAI:

**✅ Google login akan berfungsi normal**
**✅ Customer bisa login dengan akun Google mereka**  
**✅ Shopping experience jadi personal**
**✅ Checkout dengan data Google profile**

**Domain yang perlu ditambahkan: `https://pesona-rasa.netlify.app`**
