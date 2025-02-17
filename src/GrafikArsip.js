import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Chart, registerables } from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

Chart.register(...registerables);

const GrafikArsip = () => {
    const [dataKegiatan, setDataKegiatan] = useState({});
    const [chartType, setChartType] = useState("bar");

    useEffect(() => {
        const arsipRef = ref(db, "arsip_kegiatan");
        onValue(arsipRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Mengelompokkan data berdasarkan nama_kegiatan
                const formattedData = Object.values(data).reduce((acc, curr) => {
                    const namaKegiatan = curr.namaKegiatan || "Tidak Diketahui"; // Mencegah undefined
                    acc[namaKegiatan] = (acc[namaKegiatan] || 0) + 1;
                    return acc;
                }, {});

                setDataKegiatan(formattedData);
            }
        });
    }, []);

    const labels = Object.keys(dataKegiatan);
    const values = Object.values(dataKegiatan);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Jumlah Kegiatan",
                data: values,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#8A2BE2"],
                borderColor: "rgba(0, 0, 0, 0.1)",
                borderWidth: 1,
            },
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
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
                        <a className="nav-link text-white" href="/arsip">
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
            <div className="container-fluid p-4">
                <div className="card">
                    <div className="card-body">
                        <div style={{ color: 'black', fontSize: '20px' }}>Grafik Data Kearsipan</div>
                        {/* Dropdown untuk memilih tipe chart */}
                        <div className="mt-3">
                            <select className="form-select w-auto d-inline-block" onChange={(e) => setChartType(e.target.value)} value={chartType}>
                                <option value="bar">Bar Chart</option>
                                <option value="pie">Pie Chart</option>
                                <option value="line">Line Chart</option>
                            </select>
                        </div>

                        {/* Grafik */}
                        <div className="text-end mt-3">
                            <div style={{ width: 300, height: 300, display: "flex", justifyContent: "end" }}>
                                {chartType === "bar" && <Bar data={chartData} options={{ maintainAspectRatio: false }} />}
                                {chartType === "pie" && <Pie data={chartData} options={{ maintainAspectRatio: false }} />}
                                {chartType === "line" && <Line data={chartData} options={{ maintainAspectRatio: false }} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrafikArsip;
