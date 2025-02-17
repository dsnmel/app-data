import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import GrafikArsipDash from "./GrafikArsipDash";
import GrafikPemDash from "./GrafikPemDash";
import GrafikBMDash from "./GrafikBMDash";
import GrafikGeneral from "./GrafikGeneral";


const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className="sidebar text-white p-3" style={{ width: "250px", height: "500vh", backgroundColor: "hsl(210, 71.90%, 37.60%)", boxShadow: "0 4px 7px hsl(210, 71.90%, 37.60%)" }}>
        <h5 className="text-warning mb-4">
          <img src="/logo-report.png" alt="Logo" style={{ width: "150px", height: "auto", marginRight: "10px" }} />
        </h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active text-white" href="/">
              <i className="bi bi-house-fill text-warning me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/arsip">
              <i className="bi bi-graph-up text-warning me-2"></i> Kearsipan
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/Pemeliharaan">
              <i className="bi bi-graph-up text-warning me-2"></i> Pemeliharaan
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/BM">
              <i className="bi bi-graph-up text-warning me-2"></i> Belanja Modal
            </a>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <div className="container-fluid p-4 content">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow border-0">
              <div
                className="card border-0"
                style={{ boxShadow: "0 4px 10px rgba(255, 215, 0, 0.8)" }} // Warna kuning
              >
                <div className="card-body">
                  <h5 className="card-title">Grafik Analisis Data General</h5>
                  <div className="chart bg-light p-3">
                    <GrafikGeneral />  {/* 🔥 Memasukkan GrafikArsip ke Dashboard */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card h-50 shadow border-0">
            <div
                className="card border-0"
                style={{ boxShadow: "0 4px 10px rgba(255, 215, 0, 0.8)" }} // Warna kuning
              >
              <div className="card-body">
                <h6 className="card-title">Statistik Data Kearsipan</h6>
                <div className="chart bg-light p-3">
                    <GrafikArsipDash />  {/* 🔥 Memasukkan GrafikArsip ke Dashboard */}
                  </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
            <div
                className="card border-0"
                style={{ boxShadow: "0 4px 10px rgba(255, 215, 0, 0.8)" }} // Warna kuning
              >
              <div className="card-body">
                <h6 className="card-title">Statistik Data Pemeliharaan</h6>
                <div className="chart bg-light p-3">
                    <GrafikPemDash />  {/* 🔥 Memasukkan GrafikArsip ke Dashboard */}
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
            <div className="card h-80 shadow border-0 mt-5">
            <div
                className="card border-0"
                style={{ boxShadow: "0 4px 10px rgba(255, 215, 0, 0.8)" }} // Warna kuning
              >
              <div className="card-body">
                <h6 className="card-title">Statistik Data Belanja Modal</h6>
                <div className="chart bg-light p-3 ">
                    <GrafikBMDash />  {/* 🔥 Memasukkan GrafikArsip ke Dashboard */}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
