import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Charts = () => {
  const [genderData, setGenderData] = useState<
    { name: string; value: number }[]
  >([]);
  const [statusData, setStatusData] = useState<
    { name: string; active: number; deactive: number }[]
  >([]);
  const [trendData, setTrendData] = useState<{ name: string; users: number }[]>(
    [],
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const maleCount = users.filter((u: any) => u.gender === "male").length;
    const femaleCount = users.filter((u: any) => u.gender === "female").length;
    setGenderData([
      { name: "Male", value: maleCount },
      { name: "Female", value: femaleCount },
    ]);

    const activeCount = users.filter((u: any) => u.status === "active").length;
    const deactiveCount = users.filter(
      (u: any) => u.status === "deactive",
    ).length;
    setStatusData([
      { name: "Status", active: activeCount, deactive: deactiveCount },
    ]);

    const sorted = [...users].sort((a, b) => a.id - b.id);
    const trend = sorted.map((_, idx) => ({
      name: `User ${idx + 1}`,
      users: idx + 1,
    }));
    setTrendData(trend.slice(-10));
  }, []);

  const COLORS = ["#3b82f6", "#ec489a", "#8b5cf6"];

  // Tooltip سفارشی با تم تاریک (رفع سفیدی)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataName =
        payload[0].name || label || payload[0].payload?.name || "";
      const dataValue = payload[0].value;
      return (
        <div
          style={{
            backgroundColor: "#1a1a1a",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #3a3a3a",
            color: "#fff",
            fontSize: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ margin: 0 }}>{`${dataName} : ${dataValue}`}</p>
        </div>
      );
    }
    return null;
  };

  // استایل مشترک برای Legend (افزایش فاصله بین آیتم‌ها)
  const legendStyle = {
    color: "#fff",
    marginTop: "10px",
    display: "flex",
    gap: "32px",
    justifyContent: "center",
  };

  return (
    <div style={{ color: "#fff" }}>
      <h1
        style={{ marginBottom: "24px", fontSize: isMobile ? "24px" : "28px" }}
      >
        📊 Analytics Charts
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {/* نمودار دایره‌ای جنسیت */}
        <div
          style={{
            background: "#1c1c1c",
            borderRadius: "20px",
            padding: isMobile ? "16px" : "20px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            Gender Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {genderData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={legendStyle} iconSize={12} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* نمودار میله‌ای وضعیت - با فاصله زیاد بین Active/Deactive */}
        <div
          style={{
            background: "#1c1c1c",
            borderRadius: "20px",
            padding: isMobile ? "16px" : "20px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            User Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" tick={{ fill: "#ccc" }} />
              <YAxis stroke="#aaa" tick={{ fill: "#ccc" }} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Legend wrapperStyle={legendStyle} iconSize={12} />
              <Bar
                dataKey="active"
                fill="#4caf50"
                name="Active"
                barSize={isMobile ? 30 : 50}
                activeBar={{ fill: "#2e7d32" }}
              />
              <Bar
                dataKey="deactive"
                fill="#f44336"
                name="Deactive"
                barSize={isMobile ? 30 : 50}
                activeBar={{ fill: "#c62828" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* نمودار خطی رشد */}
        <div
          style={{
            background: "#1c1c1c",
            borderRadius: "20px",
            padding: isMobile ? "16px" : "20px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            User Growth (Last 10)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="name"
                stroke="#aaa"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#aaa" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={legendStyle} iconSize={12} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                name="Total Users"
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {genderData.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "40px", color: "#aaa" }}>
          No data available. Please sign up first.
        </div>
      )}
    </div>
  );
};

export default Charts;
