import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,
  ResponsiveContainer
} from "recharts";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Charts = () => {
  const [genderData, setGenderData] = useState<{ name: string; value: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; active: number; deactive: number }[]>([]);
  const [trendData, setTrendData] = useState<{ name: string; users: number }[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const maleCount = users.filter((u: any) => u.gender === "male").length;
    const femaleCount = users.filter((u: any) => u.gender === "female").length;
    const otherCount = users.filter((u: any) => u.gender === "other").length;
    setGenderData([
      { name: "مرد", value: maleCount },
      { name: "زن", value: femaleCount },
      { name: "سایر", value: otherCount },
    ]);

    const activeCount = users.filter((u: any) => u.status === "active").length;
    const deactiveCount = users.filter((u: any) => u.status === "deactive").length;
    setStatusData([{ name: "وضعیت", active: activeCount, deactive: deactiveCount }]);

    const sorted = [...users].sort((a, b) => a.id - b.id);
    const trend = sorted.map((_, idx) => ({
      name: `کاربر ${idx + 1}`,
      users: idx + 1,
    }));
    setTrendData(trend.slice(-10));
  }, []);

  const COLORS = ["#3b82f6", "#ec489a", "#8b5cf6"];

  return (
    <div style={{ color: "#fff" }}>
      <h1 style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}>📊 نمودارهای تحلیلی</h1>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {/* نمودار جنسیت */}
        <div style={{ background: "#1c1c1c", borderRadius: "20px", padding: isMobile ? "16px" : "20px", border: "1px solid #2a2a2a" }}>
          <h3 style={{ textAlign: "center", marginBottom: "16px", fontSize: isMobile ? "16px" : "18px" }}>توزیع جنسیت</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {genderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* نمودار وضعیت */}
        <div style={{ background: "#1c1c1c", borderRadius: "20px", padding: isMobile ? "16px" : "20px", border: "1px solid #2a2a2a" }}>
          <h3 style={{ textAlign: "center", marginBottom: "16px", fontSize: isMobile ? "16px" : "18px" }}>وضعیت کاربران</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#4caf50" name="فعال" />
              <Bar dataKey="deactive" fill="#f44336" name="غیرفعال" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* نمودار خطی رشد */}
        <div style={{ background: "#1c1c1c", borderRadius: "20px", padding: isMobile ? "16px" : "20px", border: "1px solid #2a2a2a" }}>
          <h3 style={{ textAlign: "center", marginBottom: "16px", fontSize: isMobile ? "16px" : "18px" }}>روند رشد (۱۰ کاربر آخر)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" name="تعداد کاربران" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {genderData.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "40px", color: "#aaa" }}>
          داده‌ای برای نمایش وجود ندارد. لطفاً ابتدا کاربر ثبت‌نام کنید.
        </div>
      )}
    </div>
  );
};

export default Charts;