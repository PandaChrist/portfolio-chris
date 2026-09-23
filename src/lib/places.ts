/**
 * Where the projects live.
 *
 * Deliberately free of any `three` import: this data is read by the project
 * list and the case-study pages, which are server-rendered and must not drag
 * the WebGL runtime into the initial bundle. The sphere maths that *does* need
 * three lives next door in geo.ts.
 */

export type PlaceId = "CM" | "BE" | "FR";

export type Place = {
  id: PlaceId;
  /** Capital / project anchor point. */
  lat: number;
  lon: number;
  city: string;
  name: Record<"fr" | "en", string>;
};

export const places: Record<PlaceId, Place> = {
  CM: {
    id: "CM",
    lat: 3.848,
    lon: 11.502,
    city: "Yaoundé",
    name: { fr: "Cameroun", en: "Cameroon" },
  },
  BE: {
    id: "BE",
    lat: 50.85,
    lon: 4.35,
    city: "Bruxelles",
    name: { fr: "Belgique", en: "Belgium" },
  },
  FR: {
    id: "FR",
    lat: 48.857,
    lon: 2.352,
    city: "Paris",
    name: { fr: "France", en: "France" },
  },
};
