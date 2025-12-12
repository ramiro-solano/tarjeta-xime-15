import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isPause = true
  //Fecha: ano, mes (0-11), día, hora, minuto, segundo
  endDate: Date =  new Date(2026, 1, 28, 21, 30, 0);
	reaminingDays!: number;
	remainingHours!: number;
	remainingMinutes!: number;
	remainingSeconds!: number;
	intervalId: any;
  	private audio: HTMLAudioElement;

	constructor() {
		this.audio = new Audio('assets/song/song.mp3');
	}

	ngOnInit(): void {
		this.updateCountdown();
		this.intervalId = setInterval(() => this.updateCountdown(), 1000);
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalId);
	}

	updateCountdown(): void {
		const now = Date.now();
		const difference = this.endDate.getTime() - now;

		if (difference <= 0) {
			// La cuenta regresiva ha terminado
			this.remainingHours = 0;
			this.remainingMinutes = 0;
			this.remainingSeconds = 0;
			clearInterval(this.intervalId);
			return;
		}

		this.reaminingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
		if (this.reaminingDays > 0) {
			this.remainingHours = Math.floor(difference / (1000 * 60 * 60)) - (this.reaminingDays * 24);
		}
		else {
			this.remainingHours = Math.floor(difference / (1000 * 60 * 60));
		}
		this.remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		this.remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
	}



	isModalOpen = true; // Se abre al cargar la página

  confirmEntry() {
    this.isModalOpen = false;
    console.log("Usuario entró a la invitación");
    // Aquí puedes agregar una redirección o lógica adicional
  }

  playMusic() {
		this.confirmEntry();

		if (this.isPause) {
			this.audio.play();
		} else {
			this.audio.pause();
		}
		this.isPause = !this.isPause;
	}

  copy(event: MouseEvent) {
		// Obtener el elemento padre del ícono de copia (el elemento <p>)
		const pElement = (event.target as HTMLElement).closest('span');
		
		if (pElement) {
			// Obtener el texto del elemento <p>
			const textToCopy = pElement.innerText;
			
			const textarea = document.createElement('textarea');
			textarea.value = textToCopy;
			document.body.appendChild(textarea);
			textarea.select();

			try {
				const successful = document.execCommand('copy');
				if (successful) {
					pElement.classList.remove('bg-slate-200');
					pElement.classList.add('bg-purple-500/50');

					setTimeout(() => {
						pElement.classList.remove('bg-purple-500/50');
						pElement.classList.add('bg-slate-200');
					}, 2000);
				} else {
					console.error('Error al copiar el texto');
				}
			} catch (error) {
				console.error('Error al copiar el texto:', error);
			}
			
			// Eliminar el textarea temporal
			document.body.removeChild(textarea);
		} else {
			alert('No se encontró el elemento para copiar.');
		}
	}

	openwhatsapp(numero: number) {
		const mensaje = encodeURIComponent("Hola, quiero confirmar mi asistencia al 15 de Ximena.");
		const url = `https://wa.me/+549${numero}?text=${mensaje}`;
		window.open(url, "_blank");
	}
	

	salonMap() {
		window.open('https://maps.app.goo.gl/SzC6upRZVkbLEmSH6');
	}

	iglesiaMap() {
		window.open('https://maps.app.goo.gl/SA3XWZzHVyu5NB2k9');
	}
}