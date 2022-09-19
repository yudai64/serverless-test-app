/* tslint:disable */
/* eslint-disable */
/**
 * Test API
 * Test API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: test@example.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateUser
 */
export interface CreateUser {
    /**
     * 
     * @type {string}
     * @memberof CreateUser
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUser
     */
    username: string;
    /**
     * 
     * @type {number}
     * @memberof CreateUser
     */
    age?: number;
}

/**
 * Check if a given object implements the CreateUser interface.
 */
export function instanceOfCreateUser(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "username" in value;

    return isInstance;
}

export function CreateUserFromJSON(json: any): CreateUser {
    return CreateUserFromJSONTyped(json, false);
}

export function CreateUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'username': json['username'],
        'age': !exists(json, 'age') ? undefined : json['age'],
    };
}

export function CreateUserToJSON(value?: CreateUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'username': value.username,
        'age': value.age,
    };
}
