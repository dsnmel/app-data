import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db } from "./firebaseConfig"; 
import { ref, push } from "firebase/database"; // 🔥 Tambahkan ini


const Arsip = () => {
    const [formData, setFormData] = useState({
        namaKegiatan: '',
        detailKegiatan: '',
        tanggal: ''
    });

    // 🔥 Tambahkan fungsi handleChange
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // 🔥 Simpan ke Realtime Database
            const kegiatanRef = ref(db, "arsip_kegiatan"); // Referensi ke tabel
            await push(kegiatanRef, { // Gunakan push untuk tambah data
                namaKegiatan: formData.namaKegiatan,
                detailKegiatan: formData.detailKegiatan,
                tanggal: formData.tanggal
            });
    
            alert("Data berhasil disimpan ke Firebase!");
            setFormData({ namaKegiatan: "", detailKegiatan: "", tanggal: "" });
    
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menyimpan data.");
        }
    };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar p-3 text-white" style={{ height: "100vh", backgroundColor: "hsl(210, 72%, 38%)" }}>
        <h5>
          <img src="/logo-report.png" alt="Logo" style={{ width: "150px", marginRight: "10px" }} />
        </h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">
              <i className="bi bi-house-fill text-warning me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/DataArsip">
              <i className="bi bi-folder text-warning me-2"></i> Kearsipan
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/GrafikArsip">
              <i className="bi bi-graph-up text-warning me-2"></i> Grafik
            </a>
          </li>
        </ul>
      </div>

        {/* Form Upload */}
        <div className="container-fluid p-4 content">
                <div className="card">
                    <div className="card-body">
                    <div style={{ color: 'black', fontSize: '20px' }}>Data Kearsipan</div>
            <form onSubmit={handleSubmit} className="p-4 shadow-sm">
            <div className="mb-3">
                <label className="form-label">Nama Kegiatan</label>
                <input
                    type="text"
                    name="namaKegiatan"
                    className="form-control"
                    value={formData.namaKegiatan}
                    onChange={handleChange} // 🔥 Perbaiki handleChange
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Detail Kegiatan</label>
                <textarea
                    name="detailKegiatan"
                    className="form-control"
                    value={formData.detailKegiatan}
                    onChange={handleChange} // 🔥 Perbaiki handleChange
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Tanggal</label>
                <input
                    type="date"
                    name="tanggal"
                    className="form-control"
                    value={formData.tanggal}
                    onChange={handleChange} // 🔥 Perbaiki handleChange
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Arsip;
