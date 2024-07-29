import ListContent from '../../components/browseCourses/ListContent.jsx';
import Sidebar from '../../components/browseCourses/Sidebar.jsx';

const BrowseCoursesPage = () => {
  return (
    <div className="grid-container">
      <Sidebar />
      <ListContent />
    </div>
  );
};

export default BrowseCoursesPage;
