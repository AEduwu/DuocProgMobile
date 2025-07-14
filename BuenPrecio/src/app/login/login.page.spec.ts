import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [{ provide: Router, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Error por correo invalido', () => {
    component.email = 'invalidemail';
    component.password = 'Valid1';
    component.login();
    expect(component.errorMsg).toContain('email válido');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('Error por contrasena invalida', () => {
    component.email = 'test@example.com';
    component.password = 'abc';
    component.login();
    expect(component.errorMsg).toContain('contraseña debe tener');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('Deberia redirigir al home', () => {
    component.email = 'test@example.com';
    component.password = 'Valid1';
    component.login();
    expect(component.errorMsg).toBe('');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('Deberia redirigir al registro', () => {
    component.goToRegister();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/register');
  });
});

