import { useState, useEffect } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import RegionSelectModal from '../../components/courseCustom/RegionSelectModal';
import CourseSidebar from '../../components/courseCustom/CourseSidebar';
import CourseContent from '../../components/courseCustom/CourseContent';

const CourseCustomPage = () => {
  const { updateFilters, selectedRegion, handleRegionSelect } = useCourse();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (selectedRegion) {
      updateFilters({ area: selectedRegion });
    }
  }, [selectedRegion]);

  const onRegionSelect = (regionCode) => {
    handleRegionSelect(regionCode);
    setIsModalOpen(false);
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

export default CourseCustomPage;
