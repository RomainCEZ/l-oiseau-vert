import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'TimeAgo'
})

export class TimeAgoPipe implements PipeTransform {
    transform(value: number): string {
        if (!value) { return "il y a longtemps"; }
        let time = (Date.now() - value) / 1000;
        if (time < 10) {
            return "à l'instant";
        } else if (time < 60) {
            return "il y a quelques instants";
        }
        const divider = [60, 60, 24, 30, 12];
        const string = [' seconde', ' minute', ' heure', ' jour', ' mois', ' an'];
        let i;
        for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
            time /= divider[i];
        }
        const plural = Math.floor(time) > 1 ? 's' : '';
        return "il y a " + Math.floor(time) + string[i] + plural;
    }
}