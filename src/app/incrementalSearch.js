import { EMPTY, fromEvent } from "rxjs";
import { map, tap, debounceTime, mergeMap, switchMap, distinctUntilChanged, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const searchInput = document.getElementById("gitUser");
const searchResult = document.getElementById('searchResult');
fromEvent(searchInput, "input")
    .pipe(
        map(e => e.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => searchResult.innerHTML = ''),
        filter( user => !!user),
        switchMap(value => ajax.getJSON(`https://api.github.com/search/users?q=${value}`)
            .pipe(
                catchError(error => EMPTY)
            )
        ),
        map(data => data.items),
        mergeMap(items => items)
    )
    .subscribe(
        user => {
            const div = document.createElement('div');
            div.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="${user.avatar_url}" class="card-img-top" alt="user image">
            <div class="card-body">
              <h5 class="card-title">${user.login}</h5>
              <a href="${user.html_url}" class="btn btn-primary">Github Profile</a>
            </div>
          </div>`;
          searchResult.appendChild(div);
        return console.log(user);
        }
    )
