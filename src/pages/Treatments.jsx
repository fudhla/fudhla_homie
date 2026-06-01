import React from "react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";

const schedule = [
  { id: 1, time: "10:00", patient: "Rina Aprilia", service: "Laser Rejuvenation", room: "Room 04", status: "On Progress" },
  { id: 2, time: "11:30", patient: "Siti Maharani", service: "Facial Detox", room: "Room 02", status: "Waiting" },
];

export default function Treatments() {
  return (
    <div className="font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Jadwal Treatment</h1>
          <p className="text-sm text-[#718EBF]">Antrean ruangan hari ini</p>
        </div>
        <Card className="px-6 py-3 rounded-2xl flex items-center gap-3 text-[#343C6A] font-bold">
          <FaCalendarAlt className="text-[#1877F2]" /> 14 Mei 2026
        </Card>
      </div>

      <div className="grid gap-4">
        {schedule.map(t => (
          <Card key={t.id} className="p-6 rounded-[25px] flex flex-col md:flex-row items-center justify-between hover:border-[#1877F2]/30 group">
            <div className="flex items-center gap-8">
              <div className="text-center min-w-[80px]">
                <p className="text-2xl font-black text-[#1877F2]">{t.time}</p>
                <p className="text-[10px] text-[#B1B1B1] font-bold uppercase tracking-widest">WIB</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#232323]">{t.patient}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-[#718EBF]">{t.service}</span>
                  <span className="px-2 py-0.5 bg-[#F5F7FA] text-[#1877F2] text-[10px] font-bold rounded border border-[#E6EFF5]">{t.room}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Badge variant={t.status === 'On Progress' ? 'progress' : 'waiting'} className="w-32">
                {t.status}
              </Badge>
              <Button variant="icon">
                <FaCheckCircle size={22} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}