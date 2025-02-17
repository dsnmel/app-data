import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./firebaseConfig";
import { ref, push } from "firebase/database";

const BM = () => {
    const [namaKegiatan, setNamaKegiatan] = useState("");
    const [detailKegiatan, setDetailKegiatan] = useState("");
    const [kebutuhanBiaya, setKebutuhanBiaya] = useState ("");
    const [progresStatus, setProgresStatus] = useState("0");
    const [tanggal, setTanggal] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi input tidak boleh kosong
        if (!namaKegiatan || !tanggal) {
            alert("Nama Kegiatan dan Tanggal wajib diisi!");
            return;
        }

        // Simpan ke Firebase
        push(ref(db, "belanjaModal"), {
            namaKegiatan,
            detailKegiatan,
            kebutuhanBiaya,
            progresStatus: parseInt(progresStatus),
            tanggal
        }).then(() => {
            alert("Data berhasil disimpan!");
            setNamaKegiatan("");
            setDetailKegiatan("");
            setKebutuhanBiaya("");
            setProgresStatus("0");
            setTanggal("");
        }).catch((error) => {
            console.error("Error menyimpan data: ", error);
        });
    };

    return (
        <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar p-3 text-white" style={{ width: "250px", height: "100vh", backgroundColor: "hsl(210, 72%, 38%)" }}>
        <h5>
          <img src="/Logo-report.png" alt="Logo" style={{ width: "150px", marginRight: "10px" }} />
        </h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">
              <i className="bi bi-house-fill text-warning me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/DataBM">
              <i className="bi bi-folder text-warning me-2"></i> Belanja Modal
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/GrafikBM">
              <i className="bi bi-graph-up text-warning me-2"></i> Grafik
            </a>
          </li>
        </ul>
      </div>
        <div className="container-fluid p-4 content">
            <div className="card">
                <div className="card-body">
                    <h4 className="mb-3">Form Belanja Modal</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nama Kegiatan</label>
                            <input type="text" className="form-control" value={namaKegiatan} onChange={(e) => setNamaKegiatan(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Detail Kegiatan</label>
                            <textarea className="form-control" value={detailKegiatan} onChange={(e) => setDetailKegiatan(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kebutuhan Biaya</label>
                            <textarea className="form-control" value={kebutuhanBiaya} onChange={(e) => setKebutuhanBiaya(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Progres Status</label>
                            <select className="form-select" value={progresStatus} onChange={(e) => setProgresStatus(e.target.value)}>
                                <option value="0%">Belum Progress - 0%</option>
                                <option value="5%">Proses - 5%</option>
                                <option value="10%">Sudah Selesai - 10%</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tanggal</label>
                            <input type="date" className="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BM;
