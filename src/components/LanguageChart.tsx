"use client";

import { Award, ShieldAlert } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { LanguageStat } from "@/types/github";

interface LanguageChartProps {
  languages: LanguageStat[];
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const CHART_COLORS = [
    "#6366f1",
    "#a855f7",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
    "#84cc16",
  ];

  return (
    <section
      aria-labelledby="chart-heading"
      className="bg-zinc-900/30 border border-zinc-900 rounded-3xl p-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-indigo-400" aria-hidden="true" />
        <h4 id="chart-heading" className="font-bold text-zinc-100 text-base">
          Distribuição de Linguagens
        </h4>
      </div>

      {languages.length > 0 ? (
        <>
          <div className="sr-only">
            <table aria-label="Tabela de distribuição de linguagens de programação">
              <thead>
                <tr>
                  <th scope="col">Linguagem</th>
                  <th scope="col">Repositórios</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang.name}>
                    <td>{lang.name}</td>
                    <td>{lang.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3 h-64" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languages}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {languages.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        stroke="rgba(9, 9, 11, 0.5)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#f4f4f5",
                    }}
                    formatter={(value) => [
                      `${value || 0} repositórios`,
                      "Quantidade",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="md:col-span-2 space-y-2.5">
              {languages.slice(0, 6).map((lang, index) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between text-sm py-0.5 px-1 rounded-md transition-colors hover:bg-zinc-900/30 focus-within:bg-zinc-900/30"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          CHART_COLORS[index % CHART_COLORS.length],
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-zinc-300 font-medium">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-zinc-500 font-semibold">
                    {lang.value} repos
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-zinc-950/20 rounded-2xl border border-zinc-900/50">
          <ShieldAlert
            className="w-10 h-10 text-zinc-700 mb-2"
            aria-hidden="true"
          />
          <p className="text-zinc-500 text-sm">
            Nenhuma linguagem detectada ou disponível nos repositórios.
          </p>
        </div>
      )}
    </section>
  );
}
