import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      providers: [{ provide: Router, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si el email es inválido', () => {
    component.email = 'correo_invalido';
    component.fullname = 'Fernando';
    component.password = 'Valid1';
    component.confirmPassword = 'Valid1';
    component.region = 'Araucanía';
    component.register();

    expect(component.errorMsg).toContain('correo válido');
    expect(component.successMsg).toBe('');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('debería mostrar error si el nombre está vacío', () => {
    component.email = 'test@mail.com';
    component.fullname = '   ';
    component.password = 'Valid1';
    component.confirmPassword = 'Valid1';
    component.region = 'Araucanía';
    component.register();

    expect(component.errorMsg).toContain('nombre no puede estar vacío');
  });

  it('debería mostrar error si la contraseña no cumple requisitos', () => {
    component.email = 'test@mail.com';
    component.fullname = 'Fernando';
    component.password = 'abc';
    component.confirmPassword = 'abc';
    component.region = 'Araucanía';
    component.register();

    expect(component.errorMsg).toContain('contraseña debe tener');
  });

  it('debería mostrar error si las contraseñas no coinciden', () => {
    component.email = 'test@mail.com';
    component.fullname = 'Fernando';
    component.password = 'Valid1';
    component.confirmPassword = 'Otro1';
    component.region = 'Araucanía';
    component.register();

    expect(component.errorMsg).toContain('contraseñas no coinciden');
  });

  it('debería mostrar error si no se selecciona una región', () => {
    component.email = 'test@mail.com';
    component.fullname = 'Fernando';
    component.password = 'Valid1';
    component.confirmPassword = 'Valid1';
    component.region = undefined;
    component.register();

    expect(component.errorMsg).toContain('Debe seleccionar una región');
  });

  it('debería registrar correctamente y redirigir después de 2 segundos', fakeAsync(() => {
    component.email = 'test@mail.com';
    component.fullname = 'Fernando';
    component.password = 'Valid1';
    component.confirmPassword = 'Valid1';
    component.region = 'Araucanía';
    component.register();

    expect(component.successMsg).toContain('¡Registro correcto!');
    tick(2000);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('debería limpiar todos los campos con clearFields()', () => {
    component.email = 'algo';
    component.fullname = 'Nombre';
    component.password = 'Clave1';
    component.confirmPassword = 'Clave1';
    component.region = 'Región';
    component.errorMsg = 'error';
    component.successMsg = 'éxito';

    component.clearFields();

    expect(component.email).toBe('');
    expect(component.fullname).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
    expect(component.region).toBeUndefined();
    expect(component.errorMsg).toBe('');
    expect(component.successMsg).toBe('');
  });
});

