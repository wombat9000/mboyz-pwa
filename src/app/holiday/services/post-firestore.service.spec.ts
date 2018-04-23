import {TestBed} from '@angular/core/testing';
import {PostFirestore} from './post-firestore.service';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {AngularFirestoreDocument} from 'angularfire2/firestore/document/document';
import {Post} from '../models/post';
import {Observable} from 'rxjs/Observable';
import {AngularFirestoreCollection} from 'angularfire2/firestore/collection/collection';
import {DocumentChangeType} from '@firebase/firestore-types';


describe('PostFirestore', () => {

  let testee: PostFirestore;
  let afs: jasmine.SpyObj<AngularFirestore>;

  const colRef = jasmine.createSpyObj<AngularFirestoreCollection<Post>>('AngularFirestoreCollection', ['valueChanges', 'stateChanges']);

  const somePost: Post = {
    id: 'someId',
    text: 'some text',
    authorId: 'author1',
    holidayId: 'holiday1',
    created: '1990'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostFirestore,
        {
          provide: AngularFirestore,
          useValue: jasmine.createSpyObj('AngularFireStore', ['collection', 'doc'])
        }]
    });

    testee = TestBed.get(PostFirestore);
    afs = TestBed.get(AngularFirestore);
  });

  describe('save', () => {
    const docRef = jasmine.createSpyObj<AngularFirestoreDocument<Post>>('AngularFirestoreDocument', ['set']);

    beforeEach(async () => {
      afs.doc.and.returnValue(docRef);
      await testee.save(somePost);
    });

    it('should save to parent holiday document', async () => {
      expect(afs.doc).toHaveBeenCalledWith(`holidays/${somePost.holidayId}/posts/${somePost.id}`);
    });

    it('should persist the post', () => {
      expect(docRef.set).toHaveBeenCalledWith(somePost);
    });
  });

  it('should observe value changes by holidayId', (done) => {
    colRef.valueChanges.and.returnValue(Observable.of([somePost]));
    afs.collection.and.returnValue(colRef);

    testee.observeByHolidayId(somePost.holidayId).subscribe(it => {
      expect(afs.collection).toHaveBeenCalledWith(`holidays/${somePost.holidayId}/posts`);
      expect(it).toEqual([somePost]);
      done();
    });
  });

  it('should observe state changes', (done) => {
    const added: DocumentChangeType = 'added';
    const change: DocumentChangeAction = {
      type: added,
      payload: null
    };

    colRef.stateChanges.and.returnValue(Observable.of([change]));
    afs.collection.and.returnValue(colRef);

    testee.observeChanges().subscribe((it: DocumentChangeAction) => {
      expect(afs.collection).toHaveBeenCalledWith(`posts`);
      expect(it).toEqual(change);
      done();
    });
  });
});
