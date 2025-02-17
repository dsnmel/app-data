import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Chart, registerables } from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

Chart.register(...registerables);

const GrafikBMDash = () => {
    const [chartData, setChartData] = useState(null);
    const [chartType, setChartType] = useState("bar"); // ✅ Perbaikan: Menambahkan state untuk tipe chart

    useEffect(() => {
        const BMRef = ref(db, "belanjaModal");
        
        const unsubscribe = onValue(BMRef, (snapshot) => {
            const data = snapshot.val();
            console.log("🔥 Data dari Firebase:", data);

            if (data) {
                const formattedData = Object.values(data).reduce((acc, curr) => {
                    const namaKegiatan = curr.namaKegiatan || "Tidak Diketahui";
                    const progresStatus = parseFloat(curr.progresStatus) || 0; // Ambil nilai progresStatus dari Firebase

                    if (!acc[namaKegiatan]) {
                        acc[namaKegiatan] = { totalProgres: 0, count: 0 };
                    }

                    acc[namaKegiatan].totalProgres += progresStatus;
                    acc[namaKegiatan].count += 1;

                    return acc;
                }, {});

                console.log("✅ Data setelah dihitung:", formattedData);

                // Konversi ke format Chart.js
                const labels = Object.keys(formattedData);
                const values = labels.map(label =>
                    parseFloat((formattedData[label].totalProgres / formattedData[label].count).toFixed(2)) // Hitung rata-rata
                );

                console.log("📊 Labels:", labels);
                console.log("📈 Values:", values);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Progres (%)",
                            data: values,
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#8A2BE2"],
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            borderWidth: 1,
                        },
                    ],
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="d-flex">
        <div className="container-fluid p-4">
        <div className="card">
            <div className="card-body">
                <div style={{ color: 'black', fontSize: '20px' }}>Grafik Data Belanja Modal</div>
            <div className="mb-3 mt-3">
                <select
                    className="form-select w-auto d-inline-block"
                    onChange={(e) => setChartType(e.target.value)} // ✅ Perbaikan: Menggunakan `setChartType`
                    value={chartType} // ✅ Perbaikan: Menggunakan `chartType`
                >
                    <option value="bar">Bar Chart</option>
                    <option value="pie">Pie Chart</option>
                    <option value="line">Line Chart</option>
                </select>
            </div>

            <div className="d-flex">
                <div style={{ width: 300, height: 300, }}>
                    {chartData && ( // ✅ Perbaikan: Gunakan `chartData`, bukan `pemeliharaanData`
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

export default GrafikBMDash;
