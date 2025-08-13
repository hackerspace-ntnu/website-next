import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { HelloWorld } from '@/components/home/HelloWorld';
import { api } from '@/lib/api/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const hello = await api.test.helloWorld();
  return (
    <div className='min-h-screen'>
      <p className='clamp-[text-lg-5xl-clamp--md]'>{hello}</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni delectus
        cupiditate debitis! Fuga minus quod ea eligendi exercitationem. Sequi
        quia possimus quaerat ipsa iste voluptatibus repudiandae atque cum sunt
        vitae. Soluta repellendus fuga minima itaque voluptate ad exercitationem
        dolore unde amet ex atque cum, consectetur dolores qui quas doloribus
        perferendis architecto optio sed mollitia accusamus tenetur fugiat
        eveniet quo? Autem! Dolores esse sint ratione consequatur cumque
        necessitatibus quam corporis perferendis facere consectetur quidem et
        ex, repudiandae tenetur neque qui. Sequi, odio praesentium. Blanditiis
        quo facilis natus quia repellat velit eos. Commodi quo minima eveniet
        voluptates ratione ipsam, a dolore aspernatur alias officiis ex cum
        laborum, esse culpa laudantium atque! Iure culpa, tenetur ad impedit
        optio reiciendis maiores delectus accusantium officiis? Quaerat
        provident laboriosam voluptatibus cum nam asperiores culpa libero totam
        sapiente quisquam sint exercitationem aliquam quidem, laudantium illo
        ullam similique. Impedit assumenda dolores, quia blanditiis excepturi
        qui architecto veritatis quas! Laboriosam illum, possimus nisi dolores,
        aspernatur quaerat ipsam reprehenderit id obcaecati repellat
        necessitatibus debitis accusantium modi commodi! Quam fugit et sequi,
        quibusdam, pariatur ducimus, aut rem quo rerum excepturi quisquam.
        Minima officiis facere, inventore voluptatem modi atque, in id aut, ab
        dicta est nesciunt perferendis dolores blanditiis facilis non! Nam,
        repudiandae. Excepturi et odio fuga pariatur omnis, sunt nobis aut.
        Reprehenderit, similique laboriosam et eveniet ut ipsa, laudantium non
        molestias magni quas animi illum modi temporibus, aut rerum earum nihil
        velit doloremque? Corrupti illum esse at dolore dignissimos ipsum ullam.
        Repudiandae sequi odio et dicta unde tempore earum nulla magni, dolores
        recusandae molestiae odit. Quis odit ut, eaque ullam hic rem tempora
        voluptate reiciendis. Tenetur excepturi nihil quae eaque asperiores! Quo
        debitis dolores nihil soluta sit optio in officia ducimus voluptates
        laborum explicabo, laudantium nisi voluptatibus sapiente maxime
        assumenda sequi dolorem asperiores quidem quis eos quaerat dolor.
        Excepturi, aspernatur suscipit.
      </p>
      <HelloWorld />
    </div>
  );
}
