import { useSelector } from "react-redux";
import JournalLayout from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

const JournalPage = () => {
  const { isSaving, active } = useSelector((store) => store.journal);

  return <JournalLayout>{!!active ? <NoteView /> : <NothingSelectedView />}</JournalLayout>;
};
export default JournalPage;
