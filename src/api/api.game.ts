/**
 * @module game
 */

import * as _ from 'lodash';

import * as dataService from '../data/data.service';
import { Event, GameSummary, Player, PlayerStatsMap, PlayerType, Team } from '../interfaces';

/**
 * Returns the total number of entries
 */
export async function getSummary(): Promise<GameSummary> {
  const data = await dataService.getBootstrapData();
  const summary = {
    total_players: data['total-players'],
    current_event: data['current-event'],
    last_entry_event: data['last-entry-event'],
    next_event: data['next-event'],
  };
  return summary;
}

/**
 * Returns a collection of all elements.
 */
export async function getPlayers(): Promise<Player[]> {
  const data = await dataService.fetchElements();
  return data;
}

/**
 * Returns all element data for a specified event
 * @param gameweek The event number
 */
export async function getPlayersStatsByGameweek(gameweek: number): Promise<PlayerStatsMap> {
  const data = await dataService.fetchEventByNumber(gameweek);
  const statsMap = _.mapValues(data.elements, (o) => {
    return o.stats;
  });
  return statsMap;
}

/**
 * Returns a collection of all element types in the game
 */
export async function getPlayerTypes(): Promise<PlayerType[]> {
  const data = await dataService.getBootstrapData();
  return data.element_types;
}

/**
 * Returns a collection of all events
 */
export async function getGameweeks(): Promise<Event[]> {
  const data = await dataService.getBootstrapData();
  return data.events;
}

/**
 * Returns a collection of all teams
 */
export async function getTeams(): Promise<Team[]> {
  const data = await dataService.getBootstrapData();
  return data.teams;
}