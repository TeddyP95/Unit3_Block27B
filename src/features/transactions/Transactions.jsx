import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deposit, withdrawal, transfer } from "./transactionsSlice";
import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  const balance = useSelector((state) => state.transactions.balance);

  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");

  const dispatch = useDispatch();

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    const amount = +amountStr;

    switch (action) {
      case "deposit":
        dispatch(deposit({ amount }));
        break;
      case "withdraw":
        dispatch(withdrawal({ amount }));
        break;
      case "transfer":
        dispatch(transfer({ amount, recipient }));
        break;
      default:
        console.error("Unknown transaction type:", action);
    }

    // Reset form after transaction
    setAmountStr("0.00");
    setRecipient("");
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
