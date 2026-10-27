'use client'

import { useState } from 'react'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'

const appointments = [
  { time: '09:00', name: 'Sofía Ramírez', treatment: 'Limpieza dental', initials: 'SR', tone: 'mint', status: 'Confirmada' },
  { time: '10:30', name: 'Carlos Mendoza', treatment: 'Valoración inicial', initials: 'CM', tone: 'blue', status: 'Pendiente' },
  { time: '12:00', name: 'Ana Torres', treatment: 'Ortodoncia · Control', initials: 'AT', tone: 'peach', status: 'Confirmada' },
  { time: '16:00', name: 'Diego Herrera', treatment: 'Endodoncia · Sesión 2', initials: 'DH', tone: 'lilac', status: 'Pendiente' },
]

const followUps = [
  { name: 'Mariana López', detail: 'Sin cita en 21 días', initials: 'ML', tone: 'peach', channel: 'WhatsApp', action: 'Enviar recordatorio' },
  { name: 'Jorge Castillo', detail: 'Próxima sesión recomendada', initials: 'JC', tone: 'blue', channel: 'Correo', action: 'Programar seguimiento' },
  { name: 'Lucía Fernández', detail: 'Tratamiento pausado', initials: 'LF', tone: 'mint', channel: 'WhatsApp', action: 'Enviar recordatorio' },
]

function Avatar({ initials, tone }: { initials: string; tone: string }) {
  return <span className={`avatar avatar-${tone}`}>{initials}</span>
}

export default function Page() {
  const [active, setActive] = useState('Resumen')
  const [showModal, setShowModal] = useState(false)
  const [notice, setNotice] = useState('')
  const [reminders, setReminders] = useState(true)

  const sendReminder = (name: string) => {
    setNotice(`Recordatorio preparado para ${name}`)
    setTimeout(() => setNotice(''), 2800)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Stethoscope /></span><span>Sonrisa<span className="brand-accent">.</span></span></div>
        <div className="workspace"><span className="workspace-dot" /> Consultorio Roma <ChevronRight /></div>
        <nav className="nav-list" aria-label="Navegación principal">
          {[['Resumen', LayoutDashboard], ['Agenda', CalendarDays], ['Pacientes', Users], ['Seguimientos', MessageCircle]].map(([label, Icon]) => (
            <button key={label as string} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label as string)}><Icon /> {label as string}{label === 'Seguimientos' && <span className="nav-count">8</span>}</button>
          ))}
        </nav>
        <div className="nav-section">GESTIÓN</div>
        <nav className="nav-list">
          <button className="nav-item"><FileText /> Tratamientos</button>
          <button className="nav-item"><Settings /> Configuración</button>
        </nav>
        <div className="sidebar-bottom"><div className="support-card"><CircleHelp /><div><strong>¿Necesitas ayuda?</strong><span>Visita nuestro centro de soporte</span></div><ChevronRight /></div><div className="profile"><div className="profile-avatar">DR</div><div><strong>Dr. Daniel Ríos</strong><span>Administrador</span></div><MoreHorizontal /></div></div>
      </aside>

      <section className="content">
        <header className="topbar"><button className="mobile-menu"><Menu /></button><div className="search"><Search /><input aria-label="Buscar pacientes" placeholder="Buscar pacientes..." /></div><div className="top-actions"><button className="icon-button" aria-label="Notificaciones"><Bell /><span className="notification-dot" /></button><div className="top-avatar">DR</div></div></header>
        <div className="page-content">
          <div className="welcome-row"><div><p className="eyebrow">MARTES, 12 DE MARZO DE 2024</p><h1>Buenos días, Daniel <span className="wave">✦</span></h1><p className="subtitle">Aquí tienes un resumen de lo que ocurre hoy en tu consultorio.</p></div><button className="primary-button" onClick={() => setShowModal(true)}><Plus /> Nueva cita</button></div>

          <div className="stats-grid"><div className="stat-card"><div className="stat-icon stat-blue"><CalendarDays /></div><div><span>Citas de hoy</span><strong>8</strong><small className="positive">+2 vs. ayer</small></div></div><div className="stat-card"><div className="stat-icon stat-green"><Users /></div><div><span>Pacientes activos</span><strong>124</strong><small className="positive">+6 este mes</small></div></div><div className="stat-card"><div className="stat-icon stat-orange"><MessageCircle /></div><div><span>Seguimientos pendientes</span><strong>8</strong><small className="attention">Requieren atención</small></div></div><div className="stat-card"><div className="stat-icon stat-purple"><ShieldCheck /></div><div><span>Tasa de asistencia</span><strong>94.2%</strong><small className="positive">+3.1% este mes</small></div></div></div>

          <div className="section-heading"><div><h2>Resumen de hoy</h2><p>Martes, 12 de marzo · 4 citas programadas</p></div><button className="text-button" onClick={() => setActive('Agenda')}>Ver agenda completa <ChevronRight /></button></div>
          <div className="dashboard-grid"><div className="appointments-card"><div className="card-heading"><div><h3>Próximas citas</h3><span>Hoy, 12 de marzo</span></div><button className="date-button"><CalendarDays /> Esta semana <ChevronRight /></button></div><div className="appointment-list">{appointments.map((item) => <div className="appointment" key={item.name}><time>{item.time}</time><div className="appointment-line" /><Avatar initials={item.initials} tone={item.tone} /><div className="appointment-info"><strong>{item.name}</strong><span>{item.treatment}</span></div><span className={`status status-${item.status === 'Confirmada' ? 'confirmed' : 'pending'}`}>{item.status}</span><button className="more-button" aria-label={`Más opciones para ${item.name}`}><MoreHorizontal /></button></div>)}</div><button className="card-footer" onClick={() => setActive('Agenda')}>Ver todas las citas <ChevronRight /></button></div>
            <div className="reminders-card"><div className="card-heading"><div><h3>Seguimientos</h3><span>Pacientes que necesitan atención</span></div><span className="alert-badge">8 pendientes</span></div><div className="followup-list">{followUps.map((item) => <div className="followup" key={item.name}><Avatar initials={item.initials} tone={item.tone} /><div className="followup-info"><strong>{item.name}</strong><span>{item.detail}</span><small><MessageCircle /> {item.channel}</small></div><button className="followup-action" onClick={() => sendReminder(item.name)}>{item.action}</button></div>)}</div><button className="card-footer" onClick={() => setActive('Seguimientos')}>Ver todos los seguimientos <ChevronRight /></button></div></div>

          <div className="bottom-grid"><div className="calendar-card"><div className="card-heading"><div><h3>Agenda semanal</h3><span>Tu actividad esta semana</span></div><div className="calendar-nav"><button aria-label="Semana anterior"><ChevronLeft /></button><button aria-label="Semana siguiente"><ChevronRight /></button></div></div><div className="week-labels">{['LUN 11','MAR 12','MIÉ 13','JUE 14','VIE 15','SÁB 16'].map((day, i) => <div className={i === 1 ? 'today' : ''} key={day}><span>{day}</span><strong>{[4, 8, 6, 7, 5, 2][i]}</strong></div>)}</div><div className="progress-bar"><span style={{ width: '78%' }} /></div><div className="calendar-summary"><span><i className="legend-dot blue-dot" /> 32 citas programadas</span><span><i className="legend-dot green-dot" /> 5 espacios disponibles</span></div></div><div className="automation-card"><div className="automation-top"><div className="stat-icon stat-orange"><Bell /></div><label className="toggle"><input type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} /><span /></label></div><h3>Recordatorios automáticos</h3><p>Ayuda a tus pacientes a no olvidar sus citas y continuar sus tratamientos.</p><div className="channel-row"><span><MessageCircle /> WhatsApp</span><span><span className="mail-icon">@</span> Correo</span></div><button className="outline-button" onClick={() => setActive('Configuración')}>{reminders ? 'Configurar recordatorios' : 'Activar recordatorios'} <ChevronRight /></button></div></div>
        </div>
      </section>
      {notice && <div className="toast"><Check /> {notice}</div>}
      {showModal && <div className="modal-backdrop" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowModal(false)} aria-label="Cerrar"><X /></button><p className="eyebrow">NUEVA CITA</p><h2>Agendar una cita</h2><p className="modal-copy">La cita se sincronizará con Google Calendar del consultorio.</p><label>Paciente<input placeholder="Buscar paciente..." /></label><label>Tratamiento<select><option>Selecciona un tratamiento</option><option>Limpieza dental</option><option>Valoración inicial</option><option>Ortodoncia · Control</option></select></label><div className="form-row"><label>Fecha<input type="date" defaultValue="2024-03-12" /></label><label>Hora<input type="time" defaultValue="09:00" /></label></div><button className="primary-button full" onClick={() => { setShowModal(false); setNotice('Cita creada y sincronizada con Google Calendar') }}><Check /> Crear cita</button></div></div>}
    </main>
  )
}
