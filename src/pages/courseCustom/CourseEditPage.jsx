import { useEffect } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import RegionSelectModal from '../../components/courseCustom/RegionSelectModal';
import CourseSidebar from '../../components/courseCustom/CourseSidebar';
import CourseContent from '../../components/courseCustom/CourseContent';

const CourseEditPage = () => {
  const {
    updateFilters,
    selectedRegion,
    handleRegionSelect,
    isModalOpen,
    setIsModalOpen,
  } = useCourse();

  useEffect(() => {
    if (selectedRegion) {
      updateFilters({ area: selectedRegion });
    }
  }, [selectedRegion]);

  const onRegionSelect = (regionCode) => {
    handleRegionSelect(regionCode);
  };

  return (
    <div className="grid-container">
      {isModalOpen && <RegionSelectModal onSelect={onRegionSelect} />}
      {!isModalOpen && (
        <>
          <CourseSidebar />
          <CourseContent />
        </>
      )}
    </div>
  );
};

export default CourseEditPage;
