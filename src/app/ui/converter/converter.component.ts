import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConverterOrchestrator } from '../../orchestrators/converter.orchestrator';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
    imports: [FormsModule, DatePipe, NzTableModule, NzButtonModule, NzCardModule, NzInputNumberModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent {
    private readonly orchestrator = inject(ConverterOrchestrator);

    vm = toSignal(this.orchestrator.getViewModel$());

    onInputChange(value: number) {
        this.orchestrator.setInputAmount(value);
    }

    onForcedRateChange(value: number | null) {
        this.orchestrator.setForcedRate(value ?? null);
    }

    onSwitch() {
        this.orchestrator.switchDirection();
    }

    onAddHistory() {
        this.orchestrator.addToHistory();
    }
}
