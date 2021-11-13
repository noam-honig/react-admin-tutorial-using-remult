
import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from 'react-admin';
import { getEntityRef, QueryOptions, EntityRef, Remult } from "remult";
import { ClassType } from 'remult/classType';
import { allEntities } from 'remult/src/context';
import { getEntityKey } from 'remult/src/remult3';

export class RemultReactAdminDataProvider implements DataProvider {
  constructor(private remult: Remult, private entities: ClassType<any>[]) {
  }
  [key: string]: any;

  getRepo(resource: string) {
    for (const e of this.entities) {
      let key = getEntityKey(e);
      if (key == resource)
        return this.remult.repo(e);
    }
    throw "unknown resource " + resource;
  }

  async getList(resource: string, params: GetListParams): Promise<GetListResult<any>> {
    let query = this.getQuery(params, resource);
    let [data, total] = await Promise.all([query.getArray(params.pagination.page), query.count()]);
    return {
      data,
      total
    };
  }
  private getQuery(params: GetListParams, resource: string) {
    let queryOptions: QueryOptions<any> = {};
    if (params.sort) {
      queryOptions.orderBy = {
        [params.sort.field]: params.sort.order == "ASC" ? "asc" : "desc"
      };
    }
    if (params.filter) {
      queryOptions.where = params.filter;
    }
    queryOptions.pageSize = params.pagination.perPage;

    let query = this.getRepo(resource).query(queryOptions);
    return query;
  }

  async getOne(resource: string, params: GetOneParams): Promise<GetOneResult<any>> {

    return {
      data: await this.getRepo(resource).findId(params.id as any)
    };
  }
  async getMany(resource: string, params: GetManyParams): Promise<GetManyResult<any>> {
    let repo = this.getRepo(resource);
    return {
      data: await repo.find({ where: repo.metadata.idMetadata.createIdInFilter(params.ids as any) })
    };
  }
  async getManyReference(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult<any>> {
    params.filter[params.target] = params.id;
    return await this.getList(resource, params);
  }
  async update(resource: string, params: UpdateParams<any>): Promise<UpdateResult<any>> {

    const ref = getEntityRef(params.previousData);
    this.setValues(ref, params);
    return { data: await ref.save() };
  }
  private setValues(ref: EntityRef<any>, params: CreateParams<any>) {
    for (const field of ref.fields) {
      field.value = params.data[field.metadata.key];
    }
  }

  async updateMany(resource: string, params: UpdateManyParams<any>): Promise<UpdateManyResult> {
    let repo = this.getRepo(resource);
    for (const id of params.ids) {
      let item = await repo.findId(id as any);
      await this.update(resource, {
        id: id,
        data: params.data,
        previousData: item
      });
    }
    return {
      data: params.ids
    };
  }
  async create(resource: string, params: CreateParams<any>): Promise<CreateResult<any>> {
    let repo = this.getRepo(resource);
    let c = repo.create();
    this.setValues(repo.getEntityRef(c), params);
    return {
      data: await c.save()
    };
  }
  async delete(resource: string, params: DeleteParams): Promise<DeleteResult<any>> {
    await getEntityRef(params.previousData).delete();
    return {
      data: params
    };
  }
  async deleteMany(resource: string, params: DeleteManyParams): Promise<DeleteManyResult> {
    for (const id of params.ids) {
      await this.delete(resource, {
        id, previousData: await this.getRepo(resource).findId(id as any)
      });
    }
    return {
      data: params.ids
    };
  }
}
