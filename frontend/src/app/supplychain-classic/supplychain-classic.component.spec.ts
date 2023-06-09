import { TestBed } from '@angular/core/testing';
import { SupplychainClassicComponent } from './supplychain-classic.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SupplychainClassicComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SupplychainClassicComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SupplyChain'`, () => {
    const fixture = TestBed.createComponent(SupplychainClassicComponent);
    const app = fixture.componentInstance;
    // @ts-ignore
    expect(app.title).toEqual('SupplyChain');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SupplychainClassicComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('SupplyChain app is running!');
  });
});
