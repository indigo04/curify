"use client";

import { Study } from "@/types/study";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudiesList() {
  const [condition, setCondition] = useState("");
  const [studies, setStudies] = useState<Study[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetch("https://clinicaltrials.gov/api/v2/studies?pageSize=10")
      .then((data) => data.json())
      .then((data) => setStudies(data.studies));
  }, []);

  const onSubmit = () => {
    fetch(`https://clinicaltrials.gov/api/v2/studies?query.cond=${condition}`)
      .then((data) => data.json())
      .then((data) => setStudies(data.studies));

    router.push(`?query.cond=${condition}`);
  };

  const ToggleButton = (study: Study) => {
    redirect(
      `http://localhost:3000/${study.protocolSection.identificationModule.nctId}`
    );
  };

  const getLocations = (study: Study) => {
    if (study.protocolSection.contactsLocationsModule) {
      if (study.protocolSection.contactsLocationsModule.locations) {
        if (
          study.protocolSection.contactsLocationsModule.locations.length > 5
        ) {
          return study.protocolSection.contactsLocationsModule.locations
            .filter(
              (item, index, self) =>
                index === self.findIndex((obj) => obj.city === item.city)
            )
            .slice(0, 5);
        } else {
          return study.protocolSection.contactsLocationsModule.locations;
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  return (
    <section className="flex flex-col px-5 lg:flex-row gap-5">
      <form
        action={onSubmit}
        className="bg-white shadow-lg rounded-lg h-fit p-2 flex flex-col gap-2 w-fit mx-auto"
      >
        <h2 className="font-semibold text-center text-2xl">Filter By</h2>
        <label className="text-gray-600 font-semibold" htmlFor="condition">
          Condition
        </label>
        <input
          type="text"
          name="condition"
          id="condition"
          placeholder="e.g. Respiratory Diseases"
          className="px-4 py-2 border-2 border-gray-500 rounded-xl"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        />
        <button
          type="submit"
          className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer"
        >
          Apply filters
        </button>
      </form>
      <div className="flex flex-col gap-5">
        {studies.map((study) => (
          <div
            key={study.protocolSection.identificationModule.nctId}
            className="flex rounded-2xl bg-white flex-col w-full shadow-lg p-4 gap-2"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="font-semibold">
                {study.protocolSection.identificationModule.officialTitle}
              </h2>
              <h2 className="py-2 px-4 border-2 border-indigo-300 bg-indigo-300 rounded-full font-semibold">
                {study.protocolSection.statusModule.overallStatus}
              </h2>
            </div>
            <div className="flex gap-2">
              <h2 className="text-gray-400">Sponsor:</h2>
              <h3>
                {
                  study.protocolSection.sponsorCollaboratorsModule.leadSponsor
                    .name
                }
              </h3>
            </div>
            <div className="flex gap-2">
              <h2 className="text-gray-400">Code:</h2>
              <h3>{study.protocolSection.identificationModule.nctId}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <h2 className="text-gray-400">Location:</h2>
              {getLocations(study).map((location, index) => (
                <div key={index} className="flex">
                  <p>{location.city}</p>
                  {location.state ? (
                    <p className="pl-1">
                      {location.state.slice(0, 2)}
                      {study.protocolSection.contactsLocationsModule?.locations
                        .length &&
                      index ===
                        study.protocolSection.contactsLocationsModule?.locations
                          .length -
                          1
                        ? ""
                        : ","}
                    </p>
                  ) : (
                    <p>
                      {study.protocolSection.contactsLocationsModule?.locations
                        .length &&
                      index ===
                        study.protocolSection.contactsLocationsModule.locations
                          .length -
                          1
                        ? ""
                        : ","}
                    </p>
                  )}
                </div>
              ))}
              {study.protocolSection.contactsLocationsModule?.locations
                .length &&
                study.protocolSection.contactsLocationsModule?.locations
                  .length > 5 && (
                  <p>
                    and{" "}
                    {study.protocolSection.contactsLocationsModule.locations
                      .length - 5}{" "}
                    more.
                  </p>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
              <h2 className="text-gray-400">Conditions:</h2>
              {study.protocolSection.conditionsModule.conditions.map(
                (condition, index) => (
                  <p key={condition}>
                    {condition}
                    {index <
                    study.protocolSection.conditionsModule.conditions.length - 1
                      ? ","
                      : ""}
                  </p>
                )
              )}
            </div>

            <div className="flex gap-2 justify-center lg:justify-end mt-auto">
              <button
                onClick={() => ToggleButton(study)}
                className="border-2 bg-indigo-500 text-white font-semibold border-indigo-500 rounded-lg py-2 px-6 cursor-pointer hover:scale-105 duration-500"
              >
                Apply To Trial
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
