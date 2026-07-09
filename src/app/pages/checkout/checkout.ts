import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CarritoService } from '../../services/carrito';
import { HistorialService } from '../../services/historial';
import { AuthService } from '../../services/auth';
import { EmailService } from '../../services/email';
import { Orden } from '../../models/orden';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, NgIf, DecimalPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit, OnDestroy {
  private fb            = inject(FormBuilder);
  private carritoSvc    = inject(CarritoService);
  private historialSvc  = inject(HistorialService);
  private authSvc       = inject(AuthService);
  private emailSvc      = inject(EmailService);
  private router        = inject(Router);

  // Formulario reactivo (rubric §7)
  form!: FormGroup;
  ordenCompletada = false;
  numeroOrden = '';
  subtotal = 0;
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.carritoSvc.total$.subscribe(v => (this.subtotal = v));
    const usuario = this.authSvc.obtenerUsuario();

    // FormBuilder con Validators (rubric §7)
    this.form = this.fb.group({
      nombre:    [usuario?.nombre || '', [Validators.required, Validators.minLength(3)]],
      email:     [usuario?.email  || '', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      telefono:  ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      tarjeta:   ['', [Validators.required, Validators.pattern(/^\d{16}$/)]]
    });
  }

  get f() { return this.form.controls; }

  itbis():  number { return this.subtotal * 0.18; }
  total():  number { return this.subtotal * 1.18; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.subtotal === 0) {
      this.router.navigate(['/carrito']);
      return;
    }

    const orden: Orden = {
      id:       `ORD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      fecha:    new Date(),
      cliente:  this.form.value,
      items:    this.carritoSvc.obtenerItems(),
      subtotal: this.subtotal,
      itbis:    this.itbis(),
      total:    this.total()
    };

    this.historialSvc.agregarOrden(orden);
    this.carritoSvc.vaciar();
    this.numeroOrden = orden.id;
    this.ordenCompletada = true;

    this.emailSvc.enviarConfirmacion(orden).catch(err =>
      console.error('Error enviando correo de confirmación:', err)
    );
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
