import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  formControl = new FormControl('', [Validators.required, Validators.pattern(/^[ATCGatcg]*$/)]);
  dnaSequenceArray: string[] = [];

  constructor(
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.formControl.valueChanges.subscribe((value: string | null) => {
      if (value !== null) {
        this.updateDnaSequenceArray(value.toUpperCase());
        if (this.dnaSequenceArray.length == 36) {
          console.log(this.splitIntoGroups(value));
          console.log(this.isMutant(this.splitIntoGroups(value)));
        }
      }
    });
  }

  updateDnaSequenceArray(value: string): void {
    const letters = value.replace(/[^ATCGatcg]/g, '').split('');
    this.dnaSequenceArray = letters;
  }

  splitIntoGroups(sequence: string): string[] {
    const chunks = sequence.match(/.{1,6}/g);
    return chunks ? chunks.map(chunk => chunk.toUpperCase()) : [];
  }

  isMutant(dna: string[]): boolean {
    let count = 0;
    const n = dna.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.checkHorizontal(dna, i, j) ||
            this.checkVertical(dna, i, j) ||
            this.checkDiagonal(dna, i, j)) {
          count++;
          if (count > 1) {
            this.openSnackBar('¡Mutante detectado! 🧬☣️', 'Cerrar');
            return true;
          }
        }
      }
    }
    
    this.openSnackBar('NO mutante detectado 🧬✅', 'Cerrar');
    return false;
  }
  
  checkHorizontal(dna: string[], i: number, j: number): boolean {
    const n = dna.length;
    if (j + 3 >= n) {
      return false;
    }
    return dna[i][j] === dna[i][j + 1] &&
           dna[i][j] === dna[i][j + 2] &&
           dna[i][j] === dna[i][j + 3];
  }
  
  checkVertical(dna: string[], i: number, j: number): boolean {
    const n = dna.length;
    if (i + 3 >= n) {
      return false;
    }
    return dna[i][j] === dna[i + 1][j] &&
           dna[i][j] === dna[i + 2][j] &&
           dna[i][j] === dna[i + 3][j];
  }
  
  checkDiagonal(dna: string[], i: number, j: number): boolean {
    const n = dna.length;
    if (i + 3 >= n || j + 3 >= n) {
      return false;
    }
    return dna[i][j] === dna[i + 1][j + 1] &&
           dna[i][j] === dna[i + 2][j + 2] &&
           dna[i][j] === dna[i + 3][j + 3];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
