import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import * as XLSX from "xlsx";

const DataBM = () => {
    const [BMData, setBMData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const BMRef = ref(db, "belanjaModal");
        onValue(BMRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formattedData = Object.keys(data).map((key, index) => ({
                    id: key,
                    ...data[key],
                    index: index + 1,
                }));
                setBMData(formattedData);
                setFilteredData(formattedData); // Set default data
            }
        });
    }, []);

    // Fungsi untuk memfilter data berdasarkan bulan dan tahun
    const handleFilter = () => {
        if (!selectedMonth || !selectedYear) {
            setFilteredData(BMData);
            return;
        }

        const filtered = BMData.filter((entry) => {
            const entryDate = new Date(entry.tanggal);
            return (
                entryDate.getMonth() + 1 === parseInt(selectedMonth) &&
                entryDate.getFullYear() === parseInt(selectedYear)
            );
        });

        setFilteredData(filtered);
    };

    // Fungsi untuk mengekspor data ke format Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Belanja Modal");
        XLSX.writeFile(workbook, "Data_Belanja_Modal.xlsx");
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
                        <a className="nav-link text-white" href="/BM">
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

            {/* Konten Utama */}
            <div className="container-fluid p-4 content">
                <div className="card">
                    <div className="card-body">
                        <div style={{ color: 'black', fontSize: '20px' }}>Data Belanja Modal</div>
                        
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <select className="form-select w-auto" onChange={(e) => setSelectedMonth(e.target.value)}>
                                <option value="">Pilih Bulan</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                                    </option>
                                ))}
                            </select>

                            <select className="form-select w-auto" onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value="">Pilih Tahun</option>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <option key={i} value={2020 + i}>
                                        {2020 + i}
                                    </option>
                                ))}
                            </select>

                            <button className="btn btn-primary" onClick={handleFilter}>
                                Filter
                            </button>

                            <button className="btn btn-success" onClick={exportToExcel}>
                                <i className="bi bi-download"></i> Export Excel
                            </button>
                        </div>

                        {/* Tabel Data */}
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Kegiatan</th>
                                        <th>Detail</th>
                                        <th>Kebutuhan Biaya</th>
                                        <th>Progres Status</th>
                                        <th>Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((entry) => (
                                            <tr key={entry.id}>
                                                <td>{entry.index}</td>
                                                <td>{entry.namaKegiatan}</td>
                                                <td>{entry.detailKegiatan || "-"}</td>
                                                <td>{entry.kebutuhanBiaya || "-"}</td>
                                                <td>{entry.progresStatus + "%"}</td>
                                                <td>{new Date(entry.tanggal).toLocaleDateString("id-ID")}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataBM;
