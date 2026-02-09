import { Component, signal } from '@angular/core';
import { ConverterComponent } from './ui/converter/converter.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',
  imports: [ConverterComponent, NzLayoutModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('convertisseur');
}
