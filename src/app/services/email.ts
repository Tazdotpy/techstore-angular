import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Orden } from '../models/orden';

// ─── Rellena estos 3 valores desde tu cuenta de EmailJS ───────────────────────
// emailjs.com → Account → API Keys → Public Key
const PUBLIC_KEY   = 'Tcwt89EdoTSE9WZ4k';
// emailjs.com → Email Services → (tu servicio de Gmail) → Service ID
const SERVICE_ID   = 'service_iug4hqa';
// emailjs.com → Email Templates → (tu plantilla) → Template ID
const TEMPLATE_ID  = 'template_zkkjv1y';
// ──────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class EmailService {

  async enviarConfirmacion(orden: Orden): Promise<void> {
    const items = orden.items
      .map(i => `${i.producto.nombre} x${i.cantidad}  RD$ ${(i.producto.precio * i.cantidad).toLocaleString('es-DO')}`)
      .join('\n');

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_name:      orden.cliente.nombre,
        to_email:     orden.cliente.email,
        numero_orden: orden.id,
        fecha:        new Date(orden.fecha).toLocaleDateString('es-DO', { dateStyle: 'long' }),
        items,
        subtotal:     `RD$ ${orden.subtotal.toLocaleString('es-DO')}`,
        itbis:        `RD$ ${orden.itbis.toLocaleString('es-DO')}`,
        total:        `RD$ ${orden.total.toLocaleString('es-DO')}`,
        direccion:    orden.cliente.direccion,
      },
      { publicKey: PUBLIC_KEY }
    );
  }
}
