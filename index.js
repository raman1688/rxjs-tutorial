// import { Button } from "bootstrap";
import { fromEvent, of, interval } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { map, scan, take, catchError } from "rxjs/operators";
import './src/app/incrementalSearch';

import "./src/style/main.scss";

const btnClear = document.getElementById("btnClear");
const btnAjax = document.getElementById("btnAjax");
const btnInterval = document.getElementById("btnInterval");
const btnArray = document.getElementById("btnArray");

const result = document.getElementById("result");

fromEvent(btnClear, "click").subscribe(() => (result.textContent = ""));
fromEvent(btnArray, "click").subscribe(() => {
  of(1, 2, 3, 4, 5, 6, 7, 8)
    .pipe(
      map((x) => ({ x: x })),
      scan((prev, current) => prev.concat(current), [])
    )
    .subscribe((value) => {
      result.textContent = JSON.stringify(value);
    });
});

fromEvent(btnInterval, "click").subscribe(() => {
  interval(1000)
    .pipe(
      map((x) => ({ x: x })),
      take(8),
      scan((prev, curr) => prev.concat(curr), [])
    )
    .subscribe((value) => (result.textContent = JSON.stringify(value)));
});

fromEvent(btnAjax, "click").subscribe(
  (v) => {
    ajax({
      url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
      method: "GET",
      headers: {
        accept: "application/json",
        "x-rapidapi-key": "4b5f870cd7mshfa0a55e1895798ep19d3d5jsnb93c77ce3f34",
        "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
      },
    }).pipe(
      map(({ response }) => response.value),
      catchError((error) => {
        console.log("error: ", error);
        return of(error);
      })
    ).subscribe(
      (e) => {
        console.log(e);
        return result.textContent = e;
      }
    );
  },
  (e) => {
    console.log(e);
  },
  () => {
    console.log("complete");
  }
);
