import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../client";
import { allUserQuery } from "../utils/data";

function AccountManager() {
  const [users, setUsers] = useState();
  const [active, setActive] = useState();
  useEffect(() => {
    const query = allUserQuery();

    client.fetch(query).then((data) => {
      console.log("data :", data);
      setUsers(data);
    });
  }, []);
  return (
    <div class="border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li class="mr-2">
          <Link
            href="#"
            className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
          >
            Profile
          </Link>
        </li>
        <li class="mr-2">
          <Link
            href="#"
            className="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
            aria-current="page"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AccountManager;
