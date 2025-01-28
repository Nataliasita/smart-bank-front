import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewHistory:boolean = false;
  filterForm: FormGroup;
  periods = ['Ene - Abr 2025', 'May - Ago 2025', 'Sep - Dic 2025'];
  statuses = ['Éxitoso', 'Fallido', 'Pendiente'];
  displayedColumns: string[] = ['date', 'approvalDate', 'amount', 'description','document', 'status'];
  data = [
    { date: '12/01/2025', approvalDate: '12/01/2025', amount: 1200000, description: 'Pago Enel', document:'001234', status: 'Éxitoso' },
    { date: '13/01/2025', approvalDate: '', amount: 1500000, description: 'Pago Enel', document:'001235', status: 'Fallido' },
    { date: '14/01/2025', approvalDate: '', amount: 3300000, description: 'Pago Enel', document:'001238', status: 'Pendiente' },
    { date: '15/01/2025', approvalDate: '', amount: 4300000, description: 'Pago Enel', document:'001238', status: 'Pendiente' },
    { date: '16/01/2025', approvalDate: '16/01/2025', amount: 6200000, description: 'Pago Ticket', document:'001234', status: 'Éxitoso' },
  ];
  filteredData = [...this.data];

  constructor(private fb: FormBuilder) { 
    this.filterForm = this.fb.group({
      period: [''],
      status: [''],
      amount: ['']
    });
  }

  ngOnInit(): void {
    this.viewHistory = true;
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.applyFilters());
  }

  goToView(view: string) {
      if (view === 'history') {
        this.viewHistory = true;
      }else {
        this.viewHistory = false;
      }
  }

  applyFilters() {
    const { period, status, amount } = this.filterForm.value;
    this.filteredData = this.data.filter(item => {
      return (!status || item.status === status) &&
             (!amount || item.amount >= amount);
    });
  }

  getStatusClass(status: string) {
    return {
      'status-success': status === 'Éxitoso',
      'status-failure': status === 'Fallido',
      'status-pending': status === 'Pendiente',
    };
  }

  

}
