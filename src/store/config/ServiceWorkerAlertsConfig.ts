import { observable, computed, action } from "mobx";

/**
 * Class representing the basic configuration for the service worker alerts.
 */
export default class ServiceWorkerAlertsConfig {
  /** Whether to show the added message. */
  @observable private _added: boolean;
  /** Whether to show the updated message. */
  @observable private _updated: boolean;

  /** The singleton instance of the class, or null if not yet created. */
  private static _instance: ServiceWorkerAlertsConfig | null = null;

  private constructor() {
    this._added = false;
    this._updated = false;
  }

  /**
   * Get an instance of the service worker config, which is a singleton.
   * @return {ServiceWorkerAlertsConfig} The instance of a service worker config.
   */
  public static getInstance(): ServiceWorkerAlertsConfig {
    return ServiceWorkerAlertsConfig._instance
      ? ServiceWorkerAlertsConfig._instance
      : (ServiceWorkerAlertsConfig._instance = new ServiceWorkerAlertsConfig());
  }

  /**
   * Get whether the service worker was added.
   * @return {boolean} Whether the service worker was added or not.
   */
  @computed public get added(): boolean {
    return this._added;
  }

  /**
   * Get whether the service worker was updated.
   * @return {boolean} Whether the service worker was updated or not.
   */
  @computed public get updated(): boolean {
    return this._updated;
  }

  /**
   * Set whether the service worker was added.
   * @param {boolean} value Whether the service worker was added.
   */
  @action public setIsAdded(value: boolean): void {
    this._added = value;
  }

  /**
   * Set whether the service worker was updated.
   * @param {boolean} value Whether the service worker was updated.
   */
  @action public setIsUpdated(value: boolean): void {
    this._updated = value;
  }
}
