import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Solution from './pages/Solution';
import Notice from './pages/Notice';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PolicyPage from './pages/PolicyPage';
import MyPage from './pages/MyPage';
import FindAccount from './pages/FindAccount';
import InstallGuide from './pages/InstallGuide';
import NoticeDetail from './pages/NoticeDetail';
import NoticeEdit from './pages/NoticeEdit';
import NoticeWrite from './pages/NoticeWrite';
import Faq from './pages/Faq';

import ContactPrivate from './pages/ContactPrivate';
import ContactPrivateWrite from './pages/ContactPrivateWrite';
import ContactPrivateDetail from './pages/InquiryDetail'; // ✅ 사용자용 상세조회 연결
import ContactPrivateEdit from './pages/ContactPrivateEdit';
import InquiryDetail from './pages/InquiryDetail'; // 👈 추가


import AdminInquiry from './pages/AdminInquiry';
import AdminInquiryDetail from './pages/AdminInquiryDetail'; // ✅ 관리자용 상세조회

import { AuthProvider } from './contexts/AuthContext';
import ParentPhoneAuth from './pages/ParentPhoneAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/parent-auth" element={<ParentPhoneAuth />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/admin/notice/write" element={<NoticeWrite />} />
        <Route path="/admin/notice/edit/:id" element={<NoticeEdit />} />

        {/* ✅ 문의하기 */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/private" element={<ContactPrivate />} />
        <Route path="/contact/private/write" element={<ContactPrivateWrite />} />
        <Route path="/contact/private/:id" element={<ContactPrivateDetail />} />
        <Route path="/contact/private/edit/:id" element={<ContactPrivateEdit />} />
        <Route path="/contact/private/:id" element={<InquiryDetail />} />

        {/* ✅ 관리자 문의 관리 */}
        <Route path="/admin/inquiry" element={<AdminInquiry />} />
        <Route path="/admin/inquiry/:id" element={<AdminInquiryDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/FindAccount" element={<FindAccount />} />
        <Route path="/install-guide" element={<InstallGuide />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
