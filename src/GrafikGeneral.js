import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Chart, registerables } from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

Chart.register(...registerables);

const GrafikGeneral = () => {
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState("bar");

    useEffect(() => {
        const arsipRef = ref(db, "arsip_kegiatan");
        const pemeliharaanRef = ref(db, "pemeliharaan");
        const BMRef = ref(db, "belanjaModal");

        const fetchData = () => {
            onValue(arsipRef, (snapshotArsip) => {
                onValue(pemeliharaanRef, (snapshotPemeliharaan) => {
                    onValue(BMRef, (snapshotBM) => {
                        const arsipData = snapshotArsip.val() || {};
                        const pemeliharaanData = snapshotPemeliharaan.val() || {};
                        const BMData = snapshotBM.val() || {};

                        // Fungsi untuk menghitung jumlah total dan rata-rata progres
                        const calculateStats = (data) => {
                            const formattedData = Object.values(data).reduce((acc, curr) => {
                                const namaKegiatan = curr.namaKegiatan || "Tidak Diketahui";
                                const progresStatus = parseFloat(curr.progresStatus) || 0;

                                if (!acc[namaKegiatan]) {
                                    acc[namaKegiatan] = { totalProgres: 0, count: 0 };
                                }

                                acc[namaKegiatan].totalProgres += progresStatus;
                                acc[namaKegiatan].count += 1;

                                return acc;
                            }, {});


                            return {
                                labels: Object.keys(formattedData), // Daftar nama kegiatan
                                values: Object.keys(formattedData).map(
                                    (label) => (formattedData[label].totalProgres / formattedData[label].count).toFixed(2) // Rata-rata progres
                                ),
                                totalItems: Object.values(data).length, // Hitung jumlah data
                            };
                        };

                        // Hitung data untuk masing-masing kategori
                        const arsipStats = calculateStats(arsipData);
                        const pemeliharaanStats = calculateStats(pemeliharaanData);
                        const BMStats = calculateStats(BMData);

                        // Gabungkan data untuk chart
                        setChartData({
                            labels: ["Arsip Kegiatan", "Pemeliharaan", "Belanja Modal"],
                            datasets: [
                                {
                                    label: "Jumlah Kegiatan",
                                    data: [arsipStats.totalItems],
                                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                                    borderColor: "rgba(0, 0, 0, 0.1)",
                                    borderWidth: 1,
                                },
                                {
                                    label: "Rata-rata Progres (%)",
                                    data: [
                                        arsipStats.values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / (arsipStats.values.length || 1),
                                        pemeliharaanStats.values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / (pemeliharaanStats.values.length || 1),
                                        BMStats.values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / (BMStats.values.length || 1),
                                    ],
                                    backgroundColor: ["#8A2BE2", "#32CD32", "#FFA500"],
                                    borderColor: "rgba(0, 0, 0, 0.1)",
                                    borderWidth: 1,
                                },
                            ],
                        });
                    });
                });
            });
        };

        fetchData();
    }, []);

    return (
        <div className="d-flex">
            {/* Grafik */}
            <div className="container-fluid p-4">
                <div className="card">
                    <div className="card-body">
                        <div style={{ color: 'black', fontSize: '20px' }}>Grafik Data Umum</div>

                        {/* Dropdown untuk memilih tipe grafik */}
                        <div className="mb-3">
                            <select
                                className="form-select w-auto d-inline-block"
                                onChange={(e) => setChartType(e.target.value)}
                                value={chartType}
                            >
                                <option value="bar">Bar Chart</option>
                                <option value="pie">Pie Chart</option>
                                <option value="line">Line Chart</option>
                            </select>
                        </div>

                        {/* Grafik */}
                        <div className="d-flex justify-content-center">
                            <div style={{ width: 400, height: 400 }}>
                                {chartData && (
                                    <>
                                        {chartType === "bar" && <Bar data={chartData} options={{ maintainAspectRatio: false }} />}
                                        {chartType === "pie" && <Pie data={chartData} options={{ maintainAspectRatio: false }} />}
                                        {chartType === "line" && <Line data={chartData} options={{ maintainAspectRatio: false }} />}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrafikGeneral;
