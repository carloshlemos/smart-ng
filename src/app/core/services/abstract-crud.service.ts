import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { Page } from '../models/page.model';
import { PageRequest } from '../models/page-request.model';
import { filter } from 'rxjs/operators';

export abstract class AbstractCrudService<T, ID> implements CrudOperations<T, ID> {
  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }

  findBy(field:String, searchParameter:String, pageRequest: PageRequest): Observable<Page<T>> {
    const params: {[key: string]: any} = [];
    
    if (field != null) {
      params[field.toString()] = searchParameter;
      params['sort'] = field + ',asc';
    }

    params['page'] = pageRequest.page;
    params['size'] = pageRequest.size;

    return this._http.get<Page<T>>(`${this._base}`, { params: params });
  }

  findAll(pageRequest?: PageRequest): Observable<Page<T>> {
    const params: {[key: string]: any} = !pageRequest ? {} : { 
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort.column + ',' + pageRequest.sort.direction
    };
    return this._http.get<Page<T>>(`${this._base}`, { params: params });
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
  }
}
