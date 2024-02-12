import mock from './mockAdapter';

import './apps/chat';
import './apps/ecommerce';
import './apps/userprofile/posts';
import './apps/userprofile/followers';
import './apps/userprofile/friends';
import './apps/userprofile/gallery';
import './apps/userprofile/photos';
import './apps/blog/index';
import './headerData';
import './apps/notes';
import './apps/contact';
import './headerData';

mock.onAny().passThrough();
