import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export class Contacto implements OnInit {
  private fb = inject(FormBuilder);

  form!: FormGroup;
  enviado = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      asunto:  ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviado = true;
    this.form.reset();
  }
}
