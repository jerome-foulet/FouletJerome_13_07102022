import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import {
  selectIsAuthenticatedUser,
  selectUserFirstName,
  selectUserLastName,
} from "../utils/selectors";
import { fetchUser, updateUser } from "../features/user";

function Profile() {
  const store = useStore();

  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser);
  const userFirstName = useSelector(selectUserFirstName);
  const userLastName = useSelector(selectUserLastName);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "Argent Bank - Profile Page";
    if (isAuthenticatedUser) {
      fetchUser(store);
    }
  }, [isAuthenticatedUser, store]);

  if (isAuthenticatedUser === false) {
    return <Navigate replace to="/login" />;
  }

  const handleUserUpdate = (event) => {
    event.preventDefault();

    updateUser(store, {
      firstName: event.target.userFirstName.value,
      lastName: event.target.userLastName.value,
    });

    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isEditing ? (
            <form className="editUser" onSubmit={handleUserUpdate}>
              <div>
                <input
                  name="userFirstName"
                  type="text"
                  id="userFirstName"
                  defaultValue={userFirstName}
                />
                <button className="sign-in-button" type="submit">
                  Save
                </button>
              </div>
              <div>
                <input
                  name="userLastName"
                  type="text"
                  id="userLastName"
                  defaultValue={userLastName}
                />
                <button
                  className="sign-in-button"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              {userFirstName} {userLastName}!
            </div>
          )}
        </h1>
        {!isEditing && (
          <button
            className="edit-button"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
