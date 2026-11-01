'use client'

import { useState } from 'react'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  CircleDot,
  Users,
  X,
} from 'lucide-react'

const appointments = [
  { time: '09:00', name: 'Sofía Ramírez', treatment: 'Ortodoncia · Control 4', stage: 'En camino', color: 'mint', initials: 'SR' },
  { time: '10:30', name: 'Carlos Mendoza', treatment: 'Valoración inicial', stage: 'Confirmada', color: 'sand', initials: 'CM' },
  { time: '12:00', name: 'Ana Torres', treatment: 'Endodoncia · Control 2', stage: 'Confirmada', color: 'coral', initials: 'AT' },
  { time: '16:00', name: 'Diego Herrera', treatment: 'Implante · Sesión 2', stage: 'Por confirmar', color: 'blue', initials: 'DH' },
]

const contactQueue = [
  { name: 'Mariana López', reason: 'No tiene WhatsApp ni correo registrado', progress: '3 de 6 controles', initials: 'ML', color: 'coral' },
  { name: 'Jorge Castillo', reason: 'El correo rebotó ayer', progress: '1 de 4 controles', initials: 'JC', color: 'sand' },
  { name: 'Lucía Fernández', reason: 'Consentimiento de WhatsApp revocado', progress: '5 de 8 controles', initials: 'LF', color: 'mint' },
]

function Avatar({ initials, color }: { initials: string; color: string }) {
  return <span className={`patient-avatar avatar-${color}`}>{initials}</span>
}

export default function Page() {
  const [active, setActive] = useState('Hoy')
  const [showModal, setShowModal] = useState(false)
  const [notice, setNotice] = useState('')
  const [autoReminders, setAutoReminders] = useState(true)

  const notify = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  return (
    <main className="clinic-shell">
      <aside className="clinic-sidebar">
        <div className="clinic-brand"><img src="/sonrisa-dental-logo.png" alt="Sonrisa, clínica dental" className="brand-logo" /></div>
        <div className="clinic-switcher"><span className="online-dot" /> Consultorio Roma <ChevronRight /></div>
        <nav className="clinic-nav" aria-label="Navegación principal">
          {[
            ['Hoy', CalendarDays], ['Agenda', Clock3], ['Pacientes', Users], ['Seguimientos', MessageCircle],
          ].map(([label, Icon]) => (
            <button key={label as string} className={`clinic-nav-item ${active === label ? 'selected' : ''}`} onClick={() => setActive(label as string)}>
              <Icon /> {label as string}{label === 'Seguimientos' && <span className="queue-count">3</span>}
            </button>
          ))}
        </nav>
        <p className="nav-label">TRATAMIENTOS</p>
        <nav className="clinic-nav">
          <button className={`clinic-nav-item ${active === 'Tratamientos' ? 'selected' : ''}`} onClick={() => setActive('Tratamientos')}><ShieldCheck /> Planes de tratamiento</button>
          <button className={`clinic-nav-item ${active === 'Configuración' ? 'selected' : ''}`} onClick={() => setActive('Configuración')}><Settings /> Configuración</button>
        </nav>
        <div className="sidebar-foot"><div className="help-note"><strong>Un consultorio que acompaña</strong><span>Cada recordatorio acerca a tu paciente a terminar.</span></div><div className="clinic-user"><span className="user-avatar">DR</span><div><strong>Dr. Daniel Ríos</strong><span>Administrador</span></div><MoreHorizontal /></div></div>
      </aside>

      <section className="clinic-content">
        <header className="clinic-topbar"><button className="mobile-menu" aria-label="Abrir menú"><Menu /></button><div className="patient-search"><Search /><input aria-label="Buscar pacientes" placeholder="Buscar por nombre o teléfono" /></div><button className="notification-button" aria-label="Notificaciones"><Bell /><span /></button><span className="top-user-avatar">DR</span></header>
        <div className="clinic-page">
          <div className="clinic-intro"><div><p className="date-kicker">MARTES, 12 DE MARZO DE 2024 · UTC-5</p><h1>Buenos días, Daniel</h1><p>Hoy acompañamos a 4 pacientes en su camino para terminar el tratamiento.</p></div><button className="coral-button" onClick={() => setShowModal(true)}><Plus /> Nueva cita</button></div>

          <section className="progress-banner" aria-label="Progreso del consultorio"><div className="banner-copy"><span className="banner-icon"><CircleDot /></span><div><p>El progreso es la cita más importante</p><strong>18 pacientes están avanzando en su tratamiento esta semana.</strong></div></div><button onClick={() => setActive('Tratamientos')}>Ver tratamientos <ChevronRight /></button></section>

          <div className="section-title"><div><p className="section-kicker">SALA DE ESPERA</p><h2>La agenda de hoy</h2></div><button className="quiet-button" onClick={() => setActive('Agenda')}>Ver agenda completa <ChevronRight /></button></div>
          <section className="schedule-card"><div className="schedule-head"><span>HORA</span><span>PACIENTE Y TRATAMIENTO</span><span>ESTADO</span></div>{appointments.map((item) => <div className="schedule-row" key={item.name}><time>{item.time}</time><span className={`schedule-line line-${item.color}`} /><Avatar initials={item.initials} color={item.color} /><div className="schedule-person"><strong>{item.name}</strong><span>{item.treatment}</span></div><span className={`appointment-state state-${item.color}`}>{item.stage}</span><button className="row-more" aria-label={`Opciones para ${item.name}`}><MoreHorizontal /></button></div>)}<button className="schedule-footer" onClick={() => setActive('Agenda')}>Abrir agenda semanal <ChevronRight /></button></section>

          <div className="section-title contact-title"><div><p className="section-kicker">PARA QUE NADIE SE QUEDE ATRÁS</p><h2>Personas que necesitan contacto</h2></div><span className="manual-badge">3 pendientes</span></div>
          <div className="contact-grid">{contactQueue.map((item) => <article className="contact-card" key={item.name}><div className="paper-fold" /><div className="contact-top"><Avatar initials={item.initials} color={item.color} /><span className="manual-label">LLAMADA MANUAL</span></div><h3>{item.name}</h3><p>{item.reason}</p><div className="mini-progress"><span style={{ width: item.progress.startsWith('5') ? '63%' : item.progress.startsWith('3') ? '50%' : '25%' }} /></div><div className="contact-meta"><span>{item.progress}</span><button onClick={() => notify(`Llamada registrada para ${item.name}`)}><Phone /> Registrar llamada</button></div></article>)}</div>

          <div className="lower-grid"><section className="treatment-card"><div className="card-title-row"><div><p className="section-kicker">CAMINOS EN CURSO</p><h2>Avance de tratamientos</h2></div><button className="quiet-button" onClick={() => setActive('Tratamientos')}>Ver todos <ChevronRight /></button></div><div className="treatment-row"><div className="treatment-name"><Avatar initials="SR" color="mint" /><div><strong>Sofía Ramírez</strong><span>Ortodoncia</span></div></div><div className="path"><span className="done" /><span className="done" /><span className="current" /><span /><span /><span /></div><span className="path-count">2 de 6</span></div><div className="treatment-row"><div className="treatment-name"><Avatar initials="AT" color="coral" /><div><strong>Ana Torres</strong><span>Endodoncia</span></div></div><div className="path"><span className="done" /><span className="current" /><span /><span /></div><span className="path-count">1 de 4</span></div></section><section className="automation-panel"><div className="automation-heading"><span className="automation-icon"><Bell /></span><label className="switch"><input type="checkbox" checked={autoReminders} onChange={(e) => setAutoReminders(e.target.checked)} /><span /></label></div><p className="section-kicker">ACOMPAÑAMIENTO AUTOMÁTICO</p><h2>Recordatorios activos</h2><p>WhatsApp y correo avisan antes y después de cada control.</p><div className="channel-list"><span><MessageCircle /> WhatsApp</span><span><Mail /> Correo</span></div><button className="quiet-button" onClick={() => setActive('Configuración')}>Configurar canales <ChevronRight /></button></section></div>
        </div>
      </section>
      {notice && <div className="clinic-toast"><Check /> {notice}</div>}
      {showModal && <div className="clinic-modal-backdrop" onClick={() => setShowModal(false)}><div className="clinic-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowModal(false)} aria-label="Cerrar"><X /></button><p className="section-kicker">NUEVA CITA</p><h2>Agendar una cita</h2><p>Se publicará en el Google Calendar del consultorio.</p><label>Paciente<input placeholder="Buscar por nombre" /></label><label>Tratamiento<select><option>Selecciona un tratamiento</option><option>Ortodoncia · Control</option><option>Endodoncia · Control</option><option>Valoración inicial</option></select></label><div className="modal-fields"><label>Fecha<input type="date" defaultValue="2024-03-12" /></label><label>Hora<input type="time" defaultValue="09:00" /></label></div><button className="coral-button modal-submit" onClick={() => { setShowModal(false); notify('Cita creada y lista para sincronizar') }}><Check /> Crear cita</button></div></div>}
    </main>
  )
}
