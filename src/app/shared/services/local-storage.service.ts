import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  // Guardar en LocalStorage
  setItem<T>(key: string, value: T): void {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (error) {
      console.error('Error guardando en LocalStorage', error);
    }
  }

  // Obtener de LocalStorage
  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) as T : null;
    } catch (error) {
      console.error('Error obteniendo datos de LocalStorage', error);
      return null;
    }
  }

  // Eliminar un item de LocalStorage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error eliminando del LocalStorage', error);
    }
  }

  // Limpiar todo el LocalStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error limpiando el LocalStorage', error);
    }
  }
}
